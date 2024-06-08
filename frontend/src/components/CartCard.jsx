import React from 'react';
import '../style/CartCard.css';

const CartCard = ({coffee, image, quantity}) => {
    const price = parseFloat(coffee.price);

    return (
        <div className="cart-card">
            <img src={image} alt={coffee.name} className="cart-image" />
            <div className="cart-card-details">
                <p>{coffee.name}</p>
                <p>Price: ${!isNaN(price) ? price.toFixed(2) : 'N/A'}</p>
                <p>Quantity: {quantity}</p>
            </div>
        </div>
    );
}

export default CartCard;