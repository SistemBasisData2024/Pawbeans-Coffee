import React, { useContext } from 'react';
import '../style/CoffeeDisplay.css';
import CoffeeItem from "./CoffeeItem.jsx";
import { StoreModal } from "./StoreModal.jsx";

const CoffeeDisplay = () => {
    const { coffee_list } = useContext(StoreModal);

    return (
        <div className='coffee-display' id='coffee-display'>
            <h2>Pick our signature coffees based on your cravings...</h2>
            <div className='coffee-display-list'>
                {coffee_list.map((item) => (
                    <CoffeeItem
                        key={item._id}
                        image={item.image}
                        name={item.name}
                        desc={item.description}
                        price={item.price}
                        id={item._id}
                    />
                ))}
            </div>
        </div>
    );
}

export default CoffeeDisplay;