import React from 'react';

import './style.css'
import { useSelector } from 'react-redux';
import { getCTALinks } from './../../store/cta';

const Loader = ({ allCaughtUp }) => {
    const {whatsapp, email} = useSelector(getCTALinks)
    return ( 
        <div className="loader">
            <div id="sun">
                <div id="rings">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                {allCaughtUp ?
                    <i className="fa fa-check"></i> :
                    null
                }
            </div>
            {allCaughtUp ?
                <div className="CTA">
                    <p className="text-center mt-4 mb-0">
                        You seem to be enjoying our content.
                    </p> 
                    <h5 className="text-center text-secondary">
                        Fancy working with us?
                    </h5>
                    <p className="text-center text-secondary mb-0">
                        Ring  @ <a href={"https://api.whatsapp.com/send?phone="+whatsapp} target="_blank" rel="noopener noreferrer">{whatsapp}</a>
                    </p>
                    <p className="text-center text-secondary">
                        Mail  @ <a href={"mailto:"+email} target="_blank" rel="noopener noreferrer">{email}</a>
                    </p>
                </div> :
                <div className="loading-text">
                    <p className="text-center mt-4 mb-0">
                        Please Wait.
                    </p>
                    <h5 className="text-center text-secondary">
                        Loading...
                    </h5>
                </div>
            }
        </div>
    );
}
 
export default Loader;