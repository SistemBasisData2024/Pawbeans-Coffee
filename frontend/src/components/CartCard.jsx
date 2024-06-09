import React from 'react';
import '../style/CartCard.css';

const CartCard = ({ coffee, image, deleteFromCart, user }) => {
    const price = parseFloat(coffee.price);

    return (
        <div className="cart-card">
            <img src={image} alt={coffee.name} className="cart-image"/>
            <p>{coffee.quantity}</p>
            <p>{coffee.name}</p>
            <p>Price: ${!isNaN(price) ? price.toFixed(2) : 'N/A'}</p>
            <button className="delete-cart-button" onClick={() => deleteFromCart(user, coffee)}>
                X
            </button>
        </div>
    );
}

export default CartCard;