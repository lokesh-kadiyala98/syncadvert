import React from 'react';
import { useSelector } from 'react-redux';

import { getCTALinks } from './../../store/cta';
import LoaderCTA from './../user/LoaderCTA/index';
import './style.css'

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
                <LoaderCTA whatsapp={whatsapp} email={email}/> :
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