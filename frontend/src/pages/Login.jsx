import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style/LoginStyle.css';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/users/login', { username, password });
            if (response.data) {
                setSuccess('Login successful! Redirecting to home...');
                setError('');
                localStorage.setItem('user', JSON.stringify(response.data.user));
                setTimeout(() => {
                    navigate('/home');
                }, 2000);
            }
        } catch (error) {
            setError('Invalid username or password');
            setSuccess('');
        }
    };

    return (
        <div className="login-bg">
            <div className="login-container">
                <h1 className="header">
                    Welcome to <br /> Pawbeans Coffee
                </h1>
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
                    onClick={handleLogin}
                    className="button"
                >
                    Login
                </button>
                <p className="footer">
                    Don't have an account? <a href="/signup" className="link">Signup</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
