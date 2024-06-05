import React from 'react';
import { Link } from 'react-router-dom';
import '../style/NavbarStyle.css';

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="logo">
                <Link to="/home" className="logo-link">
                    <img src="/logo.png" alt="Logo" className="logo-image" />
                </Link>
                <Link to="/home" className="brand">Pawbeans Coffee</Link>
            </div>
            <div className="menu">
                <Link to="/leaderboard" className="menu-item">Leaderboard</Link>
            </div>
        </div>
    );
};

export default Navbar;
