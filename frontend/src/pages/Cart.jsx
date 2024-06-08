import React, {useContext, useEffect, useState} from 'react';
import '../style/Cart.css';
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import '../style/NavbarStyle.css';
import Sidebar from "../components/Sidebar.jsx";
import '../style/SidebarStyle.css';
import '../components/CartCard.jsx';
import CartCard from "../components/CartCard.jsx";

const Cart = () => {
    const [user, setUser] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            navigate('/users/login');
        }
    }, [navigate]);

    useEffect(() => {
        const fetchUserCart = async (user) => {
            if (!user) return;
            try {
                const response = await fetch(`http://localhost:5000/cart/user-cart`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        user_id: user.user_id,
                    })
                });
                if (response.ok) {
                    const data = await response.json();
                    setCartItems(data);
                } else {
                    console.error('HTTP Error: ' + response.status);
                }
            } catch (error) {
                console.error('Error fetching cart:', error);
            }
        };
        fetchUserCart(user);
    }, [user]);

    const deleteFromCart = async (user, coffee) => {
        try {
            const response = await fetch (`http://localhost:5000/cart/delete-cart`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: user.user_id,
                    coffee_id: coffee.coffee_id
                })
            });
            if (response.ok) {
                console.log('Coffee Deleted from cart');
            } else {
                const responseBody = await response.json();
                console.error('Failed to delete coffee from cart: ', responseBody);
            }
        } catch (error) {
            console.error('Error deleting from cart:', error);
        }
    };

    const toggleAnonymous = async () => {
        if (!user) return;
        try {
            const response = await fetch('http://localhost:5000/cart/toggleAnonymous', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: user.user_id,
                    isAnonymous: !user.is_anonymous
                })
            });
            const updatedUser = await response.json();
            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));
        } catch (error) {
            console.error('Error toggling anonymous:', error);
        }
    };

    const getCoffeeImage = (id) => {
        switch (id) {
            case 1: return '/espresso.jpg';
            case 2: return '/latte.jpg';
            case 3: return '/cappuccino.jpg';
            case 4: return '/machiato.jpg';
            case 5: return '/assets_americano.png';
            case 6: return '/assets_frappuccino.png';
            case 7: return '/assets_affogato.png';
            default: return '/default-coffee.jpg';
        }
    };

    return (
        <div className="cart">
            <Navbar/>
            <div className="cart-items">
                <div className="cart-items-title">
                    <p>Item</p> <p>Item Name</p> <p>Price</p> <p>Quantity</p> <p>Total</p> <p>Remove Item</p>
                </div>
                <br/>
                <hr/>
                {cartItems.map((item, index) => (
                    <div key={item.cart_id}>
                        <div className="cart-items-item">
                            <img src={getCoffeeImage(item.coffee_id)} alt={item.name} className="cart-coffee-image"/>
                            <div>
                                <div className="cart-items-item-info">
                                    <p>{item.name}</p>
                                    <p>{item.price}</p>
                                    <p>{item.quantity}</p>
                                    <p>{item.total}</p>
                                    <button className="delete-coffee-button"
                                        onClick={() => deleteFromCart(user, {coffee_id: item.coffee_id})}>
                                        X
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Cart;
