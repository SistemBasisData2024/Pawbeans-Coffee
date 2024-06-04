import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style/SignupStyle.css'; 

const Signup = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSignup = async () => {
        try {
            const response = await axios.post('http://localhost:5000/users/signup', { username, password });
            if (response.data) {
                setSuccess('Signup successful! Redirecting to login...');
                setError('');
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            }
        } catch (error) {
            setError('User already exists');
            setSuccess('');
        }
    };

    return (
        <div className="signup-bg">
            <div className="signup-container">
                <h1 className="header">Signup</h1>
                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="input"
                    placeholder="Enter username"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input"
                    placeholder="Enter password"
                />
                <button
                    onClick={handleSignup}
                    className="button"
                >
                    Signup
                </button>
                <p className="footer">
                    Already have an account? <a href="/login" className="link">Login</a>
                </p>
            </div>
        </div>
    );
};

export default Signup;
