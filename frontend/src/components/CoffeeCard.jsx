import React from 'react';
import '../style/CoffeeCardStyle.css';

const CoffeeCard = ({ coffee, image, addToCart, removeFromCart, user }) => {
    const price = parseFloat(coffee.price);

    return (
        <div className="coffee-card">
            <img src={image} alt={coffee.name} className="coffee-image"/>
            <h2>{coffee.name}</h2>
            <p>Price: ${!isNaN(price) ? price.toFixed(2) : 'N/A'}</p>

            <button className="add-to-cart-button" onClick={() => addToCart(user, coffee)}>Add to Cart</button>
            <button className="remove-from-cart-button" onClick={() => removeFromCart(user, coffee)}>Remove from Cart</button>
        </div>
    );
};

export default CoffeeCard;
