import React from 'react';

import auth from '../../../services/authService'
import './style.css'
import { useHistory } from 'react-router-dom';

const Header = () => {
    const history = useHistory()

    const handleLogout = () => {
        auth.logout()
    }

    const handleLogoutAllDevices = () => {
        auth.logoutAllDevices()
    }

    return ( 
        <header className="admin-activity mb-5">
            <div className="head-area">
                <input type="checkbox" id="settings-toogler" />
                <label htmlFor="settings-toogler">
                    <i className="fa fa-cog"></i>
                </label>
                <ul className="drop-down">
                    <li onClick={() => history.push('/home')}>Home</li>
                    <li onClick={handleLogout}>Logout</li>
                    <li onClick={handleLogoutAllDevices}>Logout All Devices</li>
                </ul>
            </div>
        </header>
    );
}
 
export default Header;