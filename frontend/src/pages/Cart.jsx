import React, { useContext } from 'react';
import '../style/Cart.css';
import { useNavigate } from "react-router-dom";
import {CartContext} from "../components/CartContext.jsx";

const Cart = () => {
    const { cartItems, addToCart, removeFromCart, coffee, image } = useContext(CartContext);
    const navigate = useNavigate();
    const price = parseFloat(coffee.price);

    if (!cartItems) {
        console.error('cartItems is undefined.');
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
                {cartItems.map((coffee, index) => (
                    <div key={index}>
                        <div className="cart-items-title cart-items-item">
                            <img src={image} alt={coffee.name} className="cart-coffee-image"/>
                            <p>{coffee.name}</p>
                            <p>{coffee.price}</p>
                            <div>{coffee.quantity}</div>
                            <p>CartTotal: ${coffee.price * coffee.quantity}</p>
                            <p className='cart-items-remove-icon' onClick={() => removeFromCart(coffee.coffee_id)}>x</p>
                        </div>
                        <hr/>
                    </div>
                ))}
            </div>
            <div className="cart-bottom">
                <div className="cart-total">
                    <h2>Cart Totals</h2>
                    <div>
                        <div className="cart-total-details">
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr/>
                        <div className="cart-total-details">
                            <p>Delivery Fee</p>
                            <p>${getTotalCartAmount() === 0 ? 0 : 5}</p>
                        </div>
                        <hr/>
                        <div className="cart-total-details">
                            <b>Total</b>
                            <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 5}</b>
                        </div>
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
