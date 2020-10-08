import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom'

import './style.css'

const NavBar = () => {
    const [mobileNav, setMobileNav] = useState(false)

    const handler = () => {
        if (window.scrollY > 300 && !mobileNav)
            setMobileNav(true)
        else if (window.scrollY < 300 && mobileNav) 
            setMobileNav(false)
    }

    useEffect(() => {
        window.addEventListener('scroll', handler);
        return () => {
           window.removeEventListener('scroll', handler);
        }
    })

    return ( 
        <nav>
            <div className="non-mobile-nav">
                <div className="nav-brand-container">
                    <img className="nav-logo" src="https://sync-advert.s3.ap-south-1.amazonaws.com/logo.png" alt="brand-logo" />
                </div>

                <ul className="nav-list">
                    <li className="nav-list-item">
                        <NavLink to="/home">HOME</NavLink>
                    </li>
                    <li className="nav-list-item">
                        <NavLink to="/gallery">GALLERY</NavLink>
                    </li>
                    <li className="nav-list-item">
                        <NavLink to="/blog">BLOG</NavLink>
                    </li>
                    <li className="nav-list-item">
                        <NavLink to="/about">ABOUT</NavLink>
                    </li>
                    <li className="nav-list-item">
                        <NavLink to="/careers">CAREERS</NavLink>
                    </li>
                </ul>
            </div>

            <div className={mobileNav ? "mobile-nav-container show" : "mobile-nav-container"}>
                <input type="checkbox" id="menu" />
                <label style={{marginBottom: 0}} className="mobile-nav-toogler btn" htmlFor="menu">
                    <div></div>
                    <div></div>
                    <div></div>
                </label>
                <ul id="mobile-nav">
                    <li className="mobile-nav-item p-2 mt-5">
                        <NavLink to="/home">HOME</NavLink>
                    </li>
                    <li className="mobile-nav-item p-2">
                        <NavLink to="/gallery">GALLERY</NavLink>

                    </li>
                    <li className="mobile-nav-item p-2">
                        <NavLink to="/blog">BLOG</NavLink>

                    </li>
                    <li className="mobile-nav-item p-2">
                        <NavLink to="/about">ABOUT</NavLink>
                    </li>
                    <li className="mobile-nav-item p-2 mb-3">
                        <NavLink to="/careers">CAREERS</NavLink>
                    </li>
                </ul>
            </div>

        </nav>
    );
}
 
export default NavBar;