import React from 'react';

import './style.css'

const LoaderCTA = ({whatsapp, email}) => {
    return ( 
        <div className="LoaderCTA">
            <h5 className="text-center mt-4 mb-1">
                You seem to be enjoying our content.
            </h5>
            <h5 className="text-center mb-2">
                Fancy working with us?
            </h5>
            <div className="links">
                <a href={"https://api.whatsapp.com/send?phone="+whatsapp} className="phone" target="_blank"
                    rel="noopener noreferrer">
                    <i class="fab fa-whatsapp" aria-hidden="true"></i>
                </a>

                <a href={"mailto:"+email} target="_blank" className="mail" rel="noopener noreferrer">
                    <i class="fa fa-envelope" aria-hidden="true"></i>
                </a>
            </div>
        </div>
     );
}
 
export default LoaderCTA;