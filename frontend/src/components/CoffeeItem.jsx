import React from 'react';
import '../style/CoffeeItem.css';
import {useState, useContext} from 'react';
import {StoreModal} from "./StoreModal.jsx";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoBagAddOutline } from "react-icons/io5";

const CoffeeItem = ({image, name, price, desc, id}) => {
    const [itemCount, setItemCount] = useState(0);
    const {cartItems, addToCart, removeFromCart, url} = useContext(StoreModal);

    return (
        <div className="coffee-item">
            <div className='coffee-item-container'>
                <img className='coffee-item-image' src={url+"/images/"+image} alt=""/>
                {!cartItems[id]
                    ?<IoBagAddOutline className='add' onClick={() => addToCart(id)} alt=""/>
                    :<div className="coffee-item-counter">
                        <IoIosRemoveCircleOutline onClick={() => removeFromCart(id)} alt=""/>
                        <p>{cartItems[id]}</p>
                        <IoIosAddCircleOutline onClick={() => addToCart(id)} alt=""/>
                    </div>
                }
            </div>
            <div className='coffee-item-info'>
                <p className="coffee-item-name">{name}</p>
                <p className="coffee-item-desc">{desc}</p>
                <p className="coffee-item-price">{price}</p>
            </div>
        </div>
    );
}

export default CoffeeItem;