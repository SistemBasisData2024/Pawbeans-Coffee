import React from 'react';
import '../style/CartCard.css';

const CartCard = ({ coffee, image, deleteFromCart, user }) => {

    return (
        <div className="cart-card">
            <img src={image} alt={coffee.name} className="cart-image"/>
            <div className="cart-card-details">
                <p>{coffee.quantity}</p>
                <p>{coffee.name}</p>
                <p>{coffee.price}</p>
                <button className="delete-cart-button"
                        onClick={() => deleteFromCart({user_id: user.user_id}, {coffee_id: coffee.coffee_id})}>X
                </button>
            </div>
        </div>
    );
}

export default CartCard;