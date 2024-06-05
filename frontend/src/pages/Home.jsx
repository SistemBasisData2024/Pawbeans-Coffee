import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import CoffeeCard from '../components/CoffeeCard';
import PersonalizedCoffeeCard from '../components/PersonalizedCoffeeCard';
import CustomizeCoffeeModal from '../components/CustomizeCoffeeModal';
import '../style/NavbarStyle.css';
import '../style/HomeStyle.css';

const Home = () => {
    const [user, setUser] = useState(null);
    const [coffees, setCoffees] = useState([]);
    const [personalizedCoffees, setPersonalizedCoffees] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
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
        const fetchCoffees = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/coffees');
                const data = await response.json();
                setCoffees(data);
            } catch (error) {
                console.error('Error fetching coffees:', error);
            }
        };
    
        const fetchPersonalizedCoffees = async () => {
            if (!user) return;
            try {
                const response = await fetch(`http://localhost:5000/api/personalized-coffees/${user.user_id}`);
                const data = await response.json();
                setPersonalizedCoffees(data);
            } catch (error) {
                console.error('Error fetching personalized coffees:', error);
            }
        };
    
        fetchCoffees();
        fetchPersonalizedCoffees();
    }, [user]);

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

    const getCoffeeImage = (id) => {
        switch (id) {
            case 1: return '/espresso.jpg';
            case 2: return '/latte.jpg';
            case 3: return '/cappuccino.jpg';
            case 4: return '/machiato.jpg';
            default: return '/default-coffee.jpg';
        }
    };

    const handleAddCoffee = async (coffeeDetails) => {
        try {
            const response = await fetch('http://localhost:5000/api/personalized-coffees', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: user.user_id,
                    rating: coffeeDetails.rating,
                    description: coffeeDetails.description, 
                    beanType: coffeeDetails.beanType,
                    topping: coffeeDetails.toppings,
                    size: coffeeDetails.size,
                    servingType: coffeeDetails.servingType
                })
            });
            if (response.ok) {
                const newCoffee = await response.json();
                setPersonalizedCoffees(prevCoffees => [...prevCoffees, newCoffee]); 
                setIsModalOpen(false);
            } else {
                console.error('Failed to add personalized coffee');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleDeleteCoffee = async (coffeeId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/personalized-coffees/${coffeeId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Failed to delete personalized coffee:', errorText);
                return;
            }

            const data = await response.json();
            setPersonalizedCoffees(prevCoffees => prevCoffees.filter(coffee => coffee.personalized_coffee_id !== coffeeId));
        } catch (error) {
            console.error('Error:', error);
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
                        <h1>Welcome to Pawbeans Coffee, {user?.is_anonymous ? 'Anonymous' : user?.username}!</h1>
                        <p>Explore our delicious coffee menu...</p>
                    </div>
                    <div className="coffee-cards-container">
                        {coffees.map((coffee) => (
                            <div key={coffee.coffee_id}>
                                <CoffeeCard coffee={coffee} image={getCoffeeImage(coffee.coffee_id)} />
                            </div>
                        ))}
                    </div>
                    <div className="customize-section">
                        <h2>Customize your own coffee</h2>
                        <p>Create your own special menu and share it with others !!!</p>
                        <button 
                            className="add-customization-button" 
                            onClick={() => setIsModalOpen(true)}
                        >
                            Add Customization
                        </button>
                        <div className="personalized-coffee-cards">
                            {personalizedCoffees.map((coffee) => (
                                <div key={coffee.personalized_coffee_id}>
                                    <PersonalizedCoffeeCard coffee={coffee} onDelete={handleDeleteCoffee} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <CustomizeCoffeeModal 
                userId={user?.user_id} 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onAddCoffee={handleAddCoffee} 
            />
        </div>
    );
};

export default Home;
