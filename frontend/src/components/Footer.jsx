import React, { useEffect } from 'react';
import '../style/Footer.css';
import { assets } from "../assets/assets.js";
import { FaGithubSquare, FaInstagramSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const Footer = () => {

    document.addEventListener('scroll', function() {
        const footer = document.querySelector('.footer');
        const scrollPosition = window.scrollY + window.innerHeight;
        const documentHeight = document.body.scrollHeight;

        if (scrollPosition >= documentHeight) {
            footer.style.opacity = '1';
        } else {
            footer.style.opacity = '0';
        }
    });

    return (
        <div className='footer'>
            <div className='footer-content'>
                <div className='footer-content-left'>
                    <img src={assets.temporary_logo_white} alt="PawBeans Coffee Logo"/>
                    <p>Your go-to platform for all things coffee. Create, share, and order customized coffee recipes.
                        Join our community of coffee enthusiasts today!</p>
                    <div className='footer-item-social'>
                        <a href="https://github.com/SistemBasisData2024/Pawbeans-Coffee" target="_blank"
                           rel="noopener noreferrer">
                            <FaGithubSquare size={30}/>
                        </a>
                        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                            <FaInstagramSquare size={30}/>
                        </a>
                        <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                            <FaSquareXTwitter size={30}/>
                        </a>
                    </div>
                </div>
                <div className='footer-content-right'>
                    <h2>GET IN TOUCH WITH US!</h2>
                    <ul>
                        <li>+62-812-1944-6241</li>
                        <li>contact@pawbeans.com</li>
                    </ul>
                </div>
            </div>
            <hr/>
            <p className='footer-copyright'>© 2024 PawBeans Coffee. All Rights Reserved.</p>
        </div>
    );
}

export default Footer;
