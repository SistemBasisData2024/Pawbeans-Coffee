import React, { useState } from 'react';

const AddRatingModal = ({ coffeeId, onClose, onAddRating }) => {
    const [rating, setRating] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await onAddRating(coffeeId, rating);
        onClose();
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Add Rating</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="number"
                        min="1"
                        max="5"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        required
                    />
                    <button type="submit">Submit</button>
                </form>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default AddRatingModal;
