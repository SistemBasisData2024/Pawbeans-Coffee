import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const userId = user.user_id;

    const getCartItems = async () => {
        try {
            const { data } = await axios.post('http://localhost:5000/cart/get-cart', { user_id: userId });
            if (data.success) {
                setCartItems(data.cartData);
            }
        } catch (error) {
            console.error('Error fetching cart data: ', error);
        }
    };

    useEffect(() => {
        getCartItems();
    }, []);

    const addToCart = (coffeeId) => {
        axios.post('http://localhost:5000/cart/add-cart', { user_id: userId, coffee_id: coffeeId })
            .then(response => {
                if (response.data.success) {
                    getCartItems();
                }
            })
            .catch(error => {
                console.error('Error adding item to cart: ', error);
            });
    }

    const removeFromCart = (coffeeId) => {
        axios.post('http://localhost:5000/cart/remove-cart', { user_id: userId, coffee_id: coffeeId })
            .then(response => {
                if (response.data.success) {
                    getCartItems();
                }
            })
            .catch(error => {
                console.error('Error removing item from cart: ', error);
            });
    }

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    )
};

export default CartProvider;