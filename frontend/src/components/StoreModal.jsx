import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import axios from "axios";

export const StoreModal = createContext(null);

const StoreModalProvider = ({ children }) => {
    const url = "http://localhost:5000";
    const [coffee_list, setCoffeeList] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [token, setToken] = useState("");

    const addToCart = async (itemId) => {
        const newCartItems = [...cartItems];
        const itemIndex = newCartItems.findIndex(item => item.item_id === itemId);
        if (itemIndex >= 0) {
            newCartItems[itemIndex].quantity += 1;
        } else {
            newCartItems.push({ item_id: itemId, quantity: 1 });
        }
        setCartItems(newCartItems);

        if (token) {
            await axios.post(`${url}/cart/add`, { userId: token, itemId });
        }
    };

    const removeFromCart = async (itemId) => {
        const newCartItems = [...cartItems];
        const itemIndex = newCartItems.findIndex(item => item.item_id === itemId);
        if (itemIndex >= 0) {
            newCartItems[itemIndex].quantity -= 1;
            if (newCartItems[itemIndex].quantity === 0) {
                newCartItems.splice(itemIndex, 1);
            }
        }
        setCartItems(newCartItems);

        if (token) {
            await axios.post(`${url}/cart/remove`, { userId: token, itemId });
        }
    };

    const getTotalCartAmount = () => {
        return cartItems.reduce((total, { item_id, quantity }) => {
            const item = coffee_list.find((product) => product._id === item_id);
            return total + (item ? item.price * quantity : 0);
        }, 0);
    };

    const fetchCoffeeList = async () => {
        const response = await axios.get(`${url}/coffee/list`);
        setCoffeeList(response.data.data);
    };

    const loadCartData = async (token) => {
        const response = await axios.post(`${url}/cart/get`, { userId: token });
        setCartItems(response.data.cartData);
    };

    useEffect(() => {
        const loadData = async () => {
            await fetchCoffeeList();
            console.log('Fetched coffee list:', coffee_list);
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                setToken(storedToken);
                await loadCartData(storedToken);
            }
        };
        loadData();
    }, []); // Empty dependency array to run only once

    const contextValue = {
        url,
        coffee_list,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        token,
        setToken,
        loadCartData,
        setCartItems,
    };

    return (
        <StoreModal.Provider value={contextValue}>
            {children}
        </StoreModal.Provider>
    );
};

StoreModalProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default StoreModalProvider;
