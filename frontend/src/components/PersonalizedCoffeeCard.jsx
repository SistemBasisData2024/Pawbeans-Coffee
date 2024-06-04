import React, { useState } from 'react';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import '../style/PersonalizedCoffeeCardStyle.css';

const PersonalizedCoffeeCard = ({ coffee, onDelete }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const renderStars = (rating) => {
        if (typeof rating !== 'number' || isNaN(rating)) {
            return (
                <>
                    {[...Array(5)].map((_, i) => (
                        <span key={`empty-${i}`} className="star empty">☆</span>
                    ))}
                </>
            );
        }

        const fullStars = Math.floor(rating);
        const halfStars = rating % 1 !== 0 ? 1 : 0;
        const emptyStars = 5 - fullStars - halfStars;

        return (
            <>
                {[...Array(fullStars)].map((_, i) => (
                    <span key={`full-${i}`} className="star full">★</span>
                ))}
                {halfStars === 1 && <span key="half" className="star half">☆</span>}
                {[...Array(emptyStars)].map((_, i) => (
                    <span key={`empty-${i}`} className="star empty">☆</span>
                ))}
            </>
        );
    };

    const handleDeleteClick = () => {
        setIsModalOpen(true);
    };

    const handleConfirmDelete = () => {
        onDelete(coffee.personalized_coffee_id);
        setIsModalOpen(false);
    };

    const averageRating = (typeof coffee.average_rating === 'number' && !isNaN(coffee.average_rating)) 
        ? coffee.average_rating.toFixed(1) 
        : (typeof coffee.rating === 'number' && !isNaN(coffee.rating)) 
            ? coffee.rating.toFixed(1) 
            : "No Rating";

    return (
        <div className="personalized-coffee-card">
            <img src="/custom.jpg" alt="Custom Coffee" className="coffee-image" />
            <div className="coffee-details">
                <p><strong>Description:</strong> {coffee.description}</p>
                <p><strong>Bean Type:</strong> {coffee.bean_type}</p>
                <p><strong>Toppings:</strong> {Array.isArray(coffee.topping) && coffee.topping.length > 0 ? coffee.topping.join(', ') : 'None'}</p>
                <p><strong>Size:</strong> {coffee.size}</p>
                <p><strong>Serving Type:</strong> {coffee.serving_type}</p>
                <p><strong>Average Rating:</strong> 
                    {renderStars(coffee.average_rating || coffee.rating)} 
                    ({averageRating})
                </p>
            </div>
            <button className="delete-button" onClick={handleDeleteClick}>
                Delete
            </button>
            <DeleteConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirmDelete}
            />
        </div>
    );
};

export default PersonalizedCoffeeCard;
