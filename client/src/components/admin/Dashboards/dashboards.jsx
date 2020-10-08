import React from 'react';
import { NavLink } from 'react-router-dom';

import './style.css'

const Dashboards = () => {
    return ( 
        <React.Fragment>
            <div className="activity-grid mt-5">
                <NavLink to="/adminGallery" className="activity-grid-item" id="img-appearence-grid">
                    <div className="boxes">
                        <div className="box"></div>
                        <div className="box"></div>
                        <div className="box"></div>
                    </div>
                    <div className="foot-note">
                        <p className="text-light">Image Appearence</p>
                        <p className="desc">Change Web Appearence</p>
                    </div>
                </NavLink>
                
                <NavLink to="/adminGallery" className="activity-grid-item" id="manage-img-grid">
                    <div className="boxes">
                        <div className="box"></div>
                        <div className="box"></div>
                        <div className="box"></div>
                        <div className="box"></div>
                    </div>
                    <div className="foot-note">
                        <p className="text-light">Manage Images</p>
                        <p className="desc">Add/ Delete Images</p>
                    </div>
                </NavLink>
                
                <NavLink to="/adminCTA" className="activity-grid-item" id="config-social-links">
                    <div className="social-icons">
                        <i style={{animationDelay: "-.75s", animationDuration: ".12s"}} className="fab fa-instagram"></i>
                        <i style={{animationDelay: "-.3s", animationDuration: ".24s"}} className="fab fa-facebook-square"></i>
                        <i style={{animationDelay: "-.28s", animationDuration: ".18s"}} className="fab fa-youtube"></i>
                        <i style={{animationDelay: "-.21s", animationDuration: ".7s"}} className="far fa-envelope"></i>
                    </div>
                    <div className="foot-note">
                        <p className="text-light">Social Links</p>
                        <p className="desc">Change References</p>
                    </div>
                </NavLink>

                <NavLink to="/adminTeam" className="activity-grid-item" id="team-settings-grid">
                    <div className="foot-note">
                        <p className="text-light">Team Members</p>
                        <p className="desc">Configure Team</p>
                    </div>
                </NavLink>
                
                <NavLink to="/adminProfile" className="activity-grid-item" id="profile-grid">
                    <div className="foot-note">
                        <p className="text-light">Profile Settings</p>
                        <p className="desc">Logout from all devices</p>
                    </div>
                </NavLink>
                
                <NavLink to="/adminBlog" className="activity-grid-item" id="blog-grid">
                    <div className="foot-note">
                        <p className="text-light">Blog Settings</p>
                        <p className="desc">Blog Feature Under Work</p>
                    </div>
                </NavLink>
            </div>
        </React.Fragment>
    );
}
 
export default Dashboards;