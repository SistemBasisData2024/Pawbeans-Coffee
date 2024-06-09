import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../style/CoffeeDetail.css';

const CoffeeDetail = () => {
    const { id } = useParams();
    const [coffeeDetail, setCoffeeDetail] = useState(null);

    useEffect(() => {
        axios.get(`/api/coffees/${id}`)
            .then(response => setCoffeeDetail(response.data))
            .catch(error => console.error(error));
    }, [id]);

    if (!coffeeDetail) return <div>Loading...</div>;

    return (
        <div>
            <h1>{coffeeDetail.name}</h1>
            <p>Size: {coffeeDetail.size}</p>
            <p>Toppings: {coffeeDetail.toppings.join(', ')}</p>
            <p>Other details: {coffeeDetail.otherDetails}</p>
        </div>
    );
};

export default CoffeeDetail;