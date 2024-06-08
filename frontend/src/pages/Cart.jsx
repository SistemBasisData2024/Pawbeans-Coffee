import React, {useContext, useEffect, useState} from 'react';
import '../style/Cart.css';
import { useNavigate } from "react-router-dom";
import {CartContext} from "../components/CartContext.jsx";
import Navbar from "../components/Navbar.jsx";
import '../style/NavbarStyle.css';
import Sidebar from "../components/Sidebar.jsx";
import '../style/SidebarStyle.css';

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
        const fetchUserCart = async () => {
            if (!user) return;
            try {
                const response = await fetch('http://localhost:5000/cart/get-cart/${user.user_id}');
                const data = await response.json();
                setCartItems(data);
            } catch (error) {
                console.error('Error fetching cart:', error);
            }
        };
        fetchUserCart();
    }, [user]);

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

    return (
        <div className="cart">
            <Navbar/>
            <div className="cart-items">
                <div className="cart-items-title">
                    <p>Item</p> <p>Item Name</p> <p>Price</p> <p>Quantity</p> <p>Total</p> <p>Remove Item</p>
                </div>
                <div className="cart-items-lists">
                   ok
                </div>
            </div>
        </div>
    );
}

export default Cart;
