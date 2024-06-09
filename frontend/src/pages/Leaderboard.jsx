import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import LeaderboardCard from '../components/LeaderboardCard';
import '../style/NavbarStyle.css';
import '../style/LeaderboardStyle.css';

const Leaderboard = () => {
    const [user, setUser] = useState(null);
    const [personalizedCoffees, setPersonalizedCoffees] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            navigate('/login');
        }
    }, [navigate]);

    useEffect(() => {
        const fetchPersonalizedCoffees = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/personalized-coffees');
                const data = await response.json();
                setPersonalizedCoffees(data);
            } catch (error) {
                console.error('Error fetching personalized coffees:', error);
            }
        };

        fetchPersonalizedCoffees();
    }, []);

    const toggleAnonymous = async () => {
        if (!user) return;

        try {
            const response = await fetch('http://localhost:5000/users/toggleAnonymous', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: user.user_id,
                    isAnonymous: !user.is_anonymous
                })
            });
            const updatedUser = await response.json();
            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));
        } catch (error) {
            console.error('Error toggling anonymous:', error);
        }
    };

    const handleAddRating = async (coffeeId, rating) => {
        try {
            const response = await fetch('http://localhost:5000/api/ratings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: user.user_id,
                    personalizedCoffeeId: coffeeId,
                    rating: rating
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Failed to add rating:', errorText);
                return;
            }

            const updatedCoffee = await response.json();
            setPersonalizedCoffees(prevCoffees => prevCoffees.map(coffee => 
                coffee.personalized_coffee_id === coffeeId ? updatedCoffee : coffee
            ));
        } catch (error) {
            console.error('Error adding rating:', error);
        }
    };

    return (
        <div className="container">
            <Navbar />
            <Sidebar 
                username={user?.username} 
                isAnonymous={user?.is_anonymous ?? false} 
                onToggleAnonymous={toggleAnonymous} 
            />
            <div className="content">
                <div className="main-content">
                    <div className="welcome-section">
                        <h1>Welcome to Leaderboard, {user?.is_anonymous ? 'Anonymous' : user?.username}!</h1>
                        <p>Here you can see the leaderboard...</p>
                    </div>
                    <div className="leaderboard-cards-container">
                        {personalizedCoffees.map((coffee, index) => (
                            <LeaderboardCard 
                                key={coffee.personalized_coffee_id} 
                                rank={index + 1}
                                description={coffee.description} 
                                rating={coffee.average_rating || coffee.rating} 
                                username={coffee.username} 
                                isAnonymous={coffee.is_anonymous}
                                coffeeId={coffee.personalized_coffee_id}
                                onAddRating={handleAddRating}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Leaderboard;
