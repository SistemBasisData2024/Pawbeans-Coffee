import React, { useContext } from 'react';
import '../style/Cart.css';
import { StoreModal } from "../components/StoreModal.jsx";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const { cartItems, coffee_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreModal);
    const navigate = useNavigate();

    // Debugging logs
    console.log('cartItems:', cartItems);
    console.log('coffee_list:', coffee_list);

    if (!cartItems || !coffee_list) {
        console.error('cartItems or coffee_list is undefined.');
        return <div>Loading...</div>;
    }

    return (
        <div className='cart'>
            <div className='cart-items'>
                <div className='cart-item-title'>
                    <p>Items</p> <p>Title</p> <p>Price</p> <p>Quantity</p> <p>Total</p> <p>Remove</p>
                </div>
                <br/>
                <hr/>
                {coffee_list.map((item, index) => {
                    console.log(`Processing item: ${item.name}, ID: ${item._id}`);
                    if (cartItems.some(cartItem => cartItem.item_id === item._id && cartItem.quantity > 0)) {
                        const cartItem = cartItems.find(cartItem => cartItem.item_id === item._id);
                        return (
                            <div key={index}>
                                <div className="cart-items-title cart-items-item">
                                    <img src={url + "/images/" + item.image} alt="" />
                                    <p>{item.name}</p>
                                    <p>${item.price}</p>
                                    <div>{cartItem.quantity}</div>
                                    <p>${item.price * cartItem.quantity}</p>
                                    <p className='cart-items-remove-icon' onClick={() => removeFromCart(item._id)}>x</p>
                                </div>
                                <hr/>
                            </div>
                        );
                    }
                    return null; // Return null if the condition is not met
                })}
            </div>
            <div className="cart-bottom">
                <div className="cart-total">
                    <h2>Cart Totals</h2>
                    <div>
                        <div className="cart-total-details"><p>Subtotal</p><p>${getTotalCartAmount()}</p></div>
                        <hr/>
                        <div className="cart-total-details"><p>Delivery Fee</p>
                            <p>${getTotalCartAmount() === 0 ? 0 : 5}</p></div>
                        <hr/>
                        <div className="cart-total-details">
                            <b>Total</b><b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 5}</b></div>
                    </div>
                    <button>PROCEED TO CHECKOUT</button>
                </div>
                <div className="cart-promocode">
                    <div>
                        <p>If you have a promo code, Enter it here</p>
                        <div className='cart-promocode-input'>
                            <input type="text" placeholder='promo code'/>
                            <button>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
