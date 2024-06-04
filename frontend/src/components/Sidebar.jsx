import React from 'react';
import '../style/SidebarStyle.css';

const Sidebar = ({ username, isAnonymous = false, onToggleAnonymous }) => {
    const getInitials = (name) => {
        if (!name) return '';
        const names = name.split(' ');
        const initials = names.map((n) => n[0].toUpperCase()).join('');
        return initials;
    };

    const displayUsername = isAnonymous ? 'Anonymous' : username;

    return (
        <div className="sidebar">
            <div className="avatar">
                {getInitials(displayUsername)}
            </div>
            <h2 className="username">{displayUsername}</h2>
            <div className="toggle-anonymous">
                <label htmlFor="anonymous-slider">Anonymous</label>
                <input
                    type="checkbox"
                    id="anonymous-slider"
                    checked={isAnonymous}
                    onChange={onToggleAnonymous}
                />
            </div>
        </div>
    );
};

export default Sidebar;
