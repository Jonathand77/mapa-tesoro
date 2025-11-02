import React from 'react';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>Mapa del Tesoro</h1>
            <ul>
                <li><a href="#map">Mapa</a></li>
                <li><a href="#clues">Pistas</a></li>
                <li><a href="#about">Acerca de</a></li>
            </ul>
        </nav>
    );
};

export default Navbar;