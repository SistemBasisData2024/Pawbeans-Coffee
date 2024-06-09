import React, { useState } from 'react';
import AddRatingModal from '../components/AddRatingModal';  // Pastikan impor benar
import '../style/LeaderboardCardStyle.css';  // Impor gaya CSS

const LeaderboardCard = ({ rank, description, rating, username, isAnonymous, coffeeId, onAddRating }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const getRankClass = (rank) => {
        switch (rank) {
            case 1:
                return 'rank-gold';
            case 2:
                return 'rank-silver';
            case 3:
                return 'rank-bronze';
            default:
                return 'rank-normal';
        }
    };

    return (
        <div className={`card ${getRankClass(rank)}`}>
            <div className="rank-number">{rank}</div>
            <div className="card-content">
                <div className="text-content">
                    <p className="description">{description}</p>
                    <p className="username">{isAnonymous ? 'Anonymous' : username}</p>
                </div>
                <p className="rating">{rating}/5</p>
                <button onClick={() => setIsModalOpen(true)}>Add Rating</button>
            </div>
            {isModalOpen && (
                <AddRatingModal
                    coffeeId={coffeeId}
                    onClose={() => setIsModalOpen(false)}
                    onAddRating={onAddRating}
                />
            )}
        </div>
    );
};

export default LeaderboardCard;
