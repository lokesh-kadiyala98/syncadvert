import React from 'react';
import { useSelector } from 'react-redux';

import { getCTALinks } from './../../../store/cta';
import './style.css'

const FixedCTA = () => {
    const {whatsapp, email, facebook, instagram, youtube} = useSelector(getCTALinks)

    return (
        <div className="sbuttons">
            <a href={instagram} target="_blank" rel="noopener noreferrer" className="sbutton instagram" tooltip="Instagram">
                <i className="fab fa-instagram"></i>
            </a>
            <a href={facebook} target="_blank" rel="noopener noreferrer" className="sbutton facebook" tooltip="Facebook">
                <i className="fab fa-facebook-f"></i>
            </a>
            <a href={youtube} target="_blank" rel="noopener noreferrer" className="sbutton youtube" tooltip="YouTube Channel">
                <i className="fab fa-youtube"></i>
            </a>
            <a href={"https://api.whatsapp.com/send?phone="+whatsapp} target="_blank" rel="noopener noreferrer"
                className="sbutton phone" tooltip="Call">
                <i className="fab fa-whatsapp"></i>
            </a>
            <a href={"mailto:"+email} target="_blank" rel="noopener noreferrer" className="sbutton mail"
                tooltip="Mail">
                <i className="fa fa-envelope"></i>
            </a>
            <a className="sbutton mainsbutton" tooltip="Contact">
                <i className="fas fa-hands-helping"></i>
            </a>
        </div>
    );
}
 
export default FixedCTA;