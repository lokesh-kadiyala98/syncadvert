import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './style.css'
import { fetchCTA, getCTALinks } from './../../../store/cta';

const Footer = () => {
    const dispatch = useDispatch()

    const {whatsapp, email, facebook, instagram, youtube} = useSelector(getCTALinks)

    useEffect(() => {
        dispatch(fetchCTA())
    }, [dispatch])

    return (
        <footer>
            <div className="waves" style={{marginBottom: '-10px'}}>
                <svg width="100%" height="200px" fill="none" version="1.1" xmlns="http://www.w3.org/2000/svg"
                    enableBackground="new 0 0 512 512">
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#153438" />
                        <stop offset="50%" stopColor="#153438" />
                        <stop offset="100%" stopColor="#153438" />
                    </linearGradient>
                    <path fill="url(#grad1)" d="
                                    M0 67
                                    C 273,183
                                        822,-40
                                        1920.00,106 
                                    
                                    V 359 
                                    H 0 
                                    V 67
                                    Z">
                        <animate repeatCount="indefinite" fill="url(#grad1)" attributeName="d" dur="15s" attributeType="XML"
                            values="
                                        M0 77 
                                        C 473,283
                                        822,-40
                                        1920,116 
                                        
                                        V 359 
                                        H 0 
                                        V 67 
                                        Z; 
                            
                                        M0 77 
                                        C 473,-40
                                        1222,283
                                        1920,136 
                                        
                                        V 359 
                                        H 0 
                                        V 67 
                                        Z; 
                            
                                        M0 77 
                                        C 973,260
                                        1722,-53
                                        1920,120 
                                        
                                        V 359 
                                        H 0 
                                        V 67 
                                        Z; 
                            
                                        M0 77 
                                        C 473,283
                                        822,-40
                                        1920,116 
                                        
                                        V 359 
                                        H 0 
                                        V 67 
                                        Z
                                        ">
                        </animate>
                    </path>
                </svg>
            </div>

            <div className="footer-section">
                <div className="container">
                    <div className="footer-cta pt-5 pb-4">
                        <div className="row">
                            <div className="col-lg-4 mb-3">
                                <div className="single-cta">
                                    <i className="fas fa-map-marker-alt"></i>
                                    <div className="cta-text">
                                        <h4>Currently </h4>
                                        <span className="text-muted">Bangalore, Hyderabad, Bellary, Kurnool</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="col-lg-4 mb-3">
                                <div className="single-cta">
                                    <i className="fas fa-phone"></i>
                                    <div className="cta-text">
                                        <h4>Contact</h4>
                                        <span className="text-muted">{whatsapp}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 mb-3">
                                <div className="single-cta">
                                    <i className="fa fa-envelope"></i>
                                    <div className="cta-text">
                                        <h4>Mail us</h4>
                                        <span className="text-muted">{email}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="footer-content pt-4 pb-4">
                        <div className="row">
                            <div className="footer-widget col-xl-4 col-lg-4">
                                <span>Follow us on</span>
                                <div className="footer-social-icons">
                                    <a href={facebook} target="_blank" rel="noopener noreferrer"><i className="fa fa-facebook"></i></a>
                                    <a href={youtube} target="_blank" rel="noopener noreferrer"><i className="fa fa-youtube"></i></a>
                                    <Link to="#"><i className="fa fa-twitter"></i></Link>
                                    <a href={instagram} target="_blank" rel="noopener noreferrer"><i className="fa fa-instagram"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer-nav-area">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-6 col-lg-6 text-center text-lg-left">
                                <div className="footer-nav-text">
                                    <p>Syncadvert</p>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 p-3 text-right">
                                <div className="footer-menu">
                                    <ul>
                                        <li>
                                            <Link to="/home">Home</Link>
                                        </li>
                                        <li>
                                            <Link to="/gallery">Photo Gallery</Link>
                                        </li>
                                        <li>
                                            <Link to="/admin">Admin Home</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="developer-info mt-3">
                                <p className="mb-0 text-center">Designed, Developed & Maintained by <code>Lokesh Kadiyala</code></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;