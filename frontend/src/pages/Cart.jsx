import React, { useEffect, useState } from 'react';
import '../style/Cart.css';
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import '../style/NavbarStyle.css';
import axios from "axios";
import '../style/SidebarStyle.css';
import CartCard from "../components/CartCard.jsx";

const Cart = () => {
    const [user, setUser] = useState(null);
    const [cartCoffees, setCartCoffees] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            navigate('/login');
        }
    }, [navigate]);
/*
    useEffect(() => {
        const fetchUserCart = async () => {
            if (!user) return;
            try {
                const response = await fetch(`http://localhost:5000/cart/user-cart${user.user_id}`);
                const data = await response.json();
                setCartCoffees(data);
            } catch (error) {
                console.error('Error fetching cart:', error);
            }
        };
        fetchUserCart( );
    }, [user]);
 */

    const fetchUserCart = async ()=> {
        if (!user) {
            console.error('user_id is required to fetch the cart');
            return;
        }
        try {
            const response = await axios.get(`http://localhost:5000/cart/user-cart/${user.user_id}`);
            setCartCoffees(response.data);
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    };
    useEffect(() => {
        fetchUserCart();
    }, []);


    const deleteFromCart = async (user, coffee) => {
        try {
            const response = await fetch(`http://localhost:5000/cart/delete-cart`, {
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
                setCartCoffees(prev => prev.filter(c => c.coffee_id !== coffee.coffee_id));
            } else {
                const responseBody = await response.json();
                console.error('Failed to delete coffee from cart: ', responseBody);
            }
        } catch (error) {
            console.error('Error deleting from cart:', error);
        }
    };

/*
    const deleteFromCart = async (user, coffee) => {
        try {
            const response = await axios.delete('http://localhost:5000/cart/delete-cart', {
                data: {
                    user_id: user.user_id,
                    coffee_id: coffee.coffee_id
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                console.log('Coffee Deleted from cart');
                setCartCoffees(prev => prev.filter(c => c.coffee_id !== coffee.coffee_id));
            } else {
                console.error('Failed to delete coffee from cart: ', response.data);
            }
        } catch (error) {
            console.error('Error deleting from cart:', error);
        }
    };
 */

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

    const getCoffeeImage = (coffee_id) => {
        switch (coffee_id) {
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
            <div className="cart-items-title">
                <p>Item</p> <p>Item Name</p> <p>Price</p> <p>Quantity</p> <p>Remove Item</p>
            </div>
            <hr/>
            <div className="cart-cards">
                {cartCoffees.map((coffee) => (
                    <div key={coffee.coffee_id}>
                        <img src={getCoffeeImage(coffee.coffee_id)} alt={coffee.name} className="cart-image"/>
                        <p>{coffee.quantity}</p>
                        <p>{coffee.name}</p>
                        <p>{coffee.price}</p>
                        <button className="delete-cart-button" onClick={() => deleteFromCart(user, {coffee_id: coffee.coffee_id})}>
                            X
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
    /*
        return (
            <div className="cart">
                <Navbar />
                <div className="cart-items">
                    <div className="cart-items-title">
                        <p>Item</p> <p>Item Name</p> <p>Price</p> <p>Quantity</p> <p>Total</p> <p>Remove Item</p>
                    </div>
                    <hr />
                    <div className="cart-items-container">
                    {cartCoffees.map((coffee) => (
                        <div key={coffee.coffee_id}>
                            <div className="cart-items-item">
                                <img src={getCoffeeImage(coffee.coffee_id)} alt={coffee.name} className="cart-coffee-image" />
                                    <div className="cart-items-item-info">
                                        <p>{coffee.name}</p>
                                        <p>{coffee.price}</p>
                                        <p>{coffee.quantity}</p>
                                        <button onClick={() => deleteFromCart(user, coffee)}>
                                            X
                                        </button>
                                    </div>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        );

     */
}

export default Cart;
