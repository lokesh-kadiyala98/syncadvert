import React from 'react';

import './style.css'

const Loader = ({ allCaughtUp }) => {
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
                <React.Fragment>
                    <p className="text-center mt-4 mb-0">
                        You seem to be enjoying our content.
                    </p> 
                    <h5 className="text-center text-secondary">
                        Fancy working with us?
                    </h5>
                </React.Fragment>
                :
                <React.Fragment>
                    <p className="text-center mt-4 mb-0">
                        Please Wait.
                    </p>
                    <h5 className="text-center text-secondary">
                        Loading...
                    </h5>
                </React.Fragment>
            }
        </div>
    );
}
 
export default Loader;