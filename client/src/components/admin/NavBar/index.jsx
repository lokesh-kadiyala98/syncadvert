import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchAdminProfile, getAdminProfile } from '../../../store/auth';

import { s3BucketName } from './../../../config.json'
import './style.css'

const NavBar = (props) => {
    const dispatch = useDispatch()
    const {name, img} = useSelector(getAdminProfile)

    let imgSrc = s3BucketName + img

    useEffect(() => {
        dispatch(fetchAdminProfile())
    }, [dispatch])

    return ( 
        <nav className="admin-navbar">
            <div className="profile">
                <img className="pic" src={img ? imgSrc : "https://sync-advert.s3.ap-south-1.amazonaws.com/avatar.png"} alt="admin" />
                <p className="mt-3">Hello! <span className="name">{name}</span></p>
            </div>
            <ul className="navbar-nav">
                <li>
                    <NavLink to="/admin">
                        <i className="fa fa-home icon"></i>
                        <span>
                            Home
                        </span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/adminGallery">
                        <i className="fa fa-images icon"></i>
                        <span>
                            Gallery
                        </span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/adminCTA">
                        <i className="fa fa-link icon"></i>
                        <span>
                            CTA
                        </span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/adminTeam">
                        <i className="fa fa-user-friends icon"></i>
                        <span>
                            Team
                        </span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/adminTestimonials">
                        <i className="fa fa-quote-left icon" aria-hidden="true"></i>
                        <span>
                            Testimonial
                        </span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/adminBlog">
                        <i className="fa fa-keyboard icon"></i>
                        <span>
                            Blog
                        </span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/adminProfile">
                        <i className="fa fa-id-badge icon"></i>
                        <span>
                            Profile
                        </span>
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}
 
export default NavBar;