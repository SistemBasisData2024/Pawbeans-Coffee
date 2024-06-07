import React from 'react';
import '../style/CoffeeCardStyle.css';

const CoffeeCard = ({ coffee, image, onAddToCart }) => {
    const price = parseFloat(coffee.price);

    return (
        <div className="coffee-card">
            <img src={image} alt={coffee.name} className="coffee-image"/>
            <h2>{coffee.name}</h2>
            <p>Price: ${!isNaN(price) ? price.toFixed(2) : 'N/A'}</p>

            <button onClick={() => onAddToCart(coffee.coffee_id)}>Add to Cart</button>
        </div>
    );
};

export default CoffeeCard;
