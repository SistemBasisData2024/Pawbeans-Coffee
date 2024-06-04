import React from 'react';
import { Link } from 'react-router-dom';
import '../style/NavbarStyle.css';

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="logo">
                <img src="/logo.png" alt="Logo" className="logo-image" />
                <Link to="/" className="brand">Pawbeans Coffee</Link>
            </div>
        </div>
    );
};

export default Navbar;
