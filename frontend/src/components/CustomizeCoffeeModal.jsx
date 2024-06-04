import React, { useState } from 'react';
import '../style/CustomizeCoffeeModalStyle.css';

const CustomizeCoffeeModal = ({ isOpen, onClose, onAddCoffee }) => {
    const [description, setDescription] = useState('');
    const [beanType, setBeanType] = useState('');
    const [toppings, setToppings] = useState([]);
    const [size, setSize] = useState('medium');
    const [servingType, setServingType] = useState('hot');

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddCoffee({ description, beanType, toppings, size, servingType, rating: 0 });
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Customize Your Coffee</h2>
                <form onSubmit={handleSubmit}>
                    <div className="option">
                        <label>
                            Description:
                            <input 
                                type="text" 
                                value={description} 
                                onChange={(e) => setDescription(e.target.value)} 
                                required 
                            />
                        </label>
                    </div>
                    <div className="option">
                        <label>
                            Bean Type:
                            <select value={beanType} onChange={(e) => setBeanType(e.target.value)} required>
                                <option value="" disabled>Select bean type</option>
                                <option value="Bali Kintamani Arabica">Bali Kintamani Arabica</option>
                                <option value="Dampit Robusta">Dampit Robusta</option>
                                <option value="Toraja Robusta">Toraja Robusta</option>
                                <option value="Sidikalang Robusta">Sidikalang Robusta</option>
                            </select>
                        </label>
                    </div>
                    <div className="option">
                        <label>
                            Toppings:
                            <div>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="whipped cream"
                                        checked={toppings.includes("whipped cream")}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setToppings([...toppings, e.target.value]);
                                            } else {
                                                setToppings(toppings.filter((topping) => topping !== e.target.value));
                                            }
                                        }}
                                    />
                                    Whipped Cream
                                </label>
                            </div>
                            <div>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="chocolate sauce"
                                        checked={toppings.includes("chocolate sauce")}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setToppings([...toppings, e.target.value]);
                                            } else {
                                                setToppings(toppings.filter((topping) => topping !== e.target.value));
                                            }
                                        }}
                                    />
                                    Chocolate Sauce
                                </label>
                            </div>
                            <div>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="caramel sauce"
                                        checked={toppings.includes("caramel sauce")}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setToppings([...toppings, e.target.value]);
                                            } else {
                                                setToppings(toppings.filter((topping) => topping !== e.target.value));
                                            }
                                        }}
                                    />
                                    Caramel Sauce
                                </label>
                            </div>
                            <div>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="biscuit crumbs"
                                        checked={toppings.includes("biscuit crumbs")}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setToppings([...toppings, e.target.value]);
                                            } else {
                                                setToppings(toppings.filter((topping) => topping !== e.target.value));
                                            }
                                        }}
                                    />
                                    Biscuit Crumbs
                                </label>
                            </div>
                        </label>
                    </div>
                    <div className="option">
                        <label>
                            Size:
                            <select value={size} onChange={(e) => setSize(e.target.value)}>
                                <option value="small">Small</option>
                                <option value="medium">Medium</option>
                                <option value="large">Large</option>
                            </select>
                        </label>
                    </div>
                    <div className="option">
                        <label>
                            Serving Type:
                            <select value={servingType} onChange={(e) => setServingType(e.target.value)}>
                                <option value="hot">Hot</option>
                                <option value="cold">Cold</option>
                            </select>
                        </label>
                    </div>
                    <div className="modal-buttons">
                        <button type="button" onClick={onClose}>Cancel</button>
                        <button type="submit">Add Coffee</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CustomizeCoffeeModal;
