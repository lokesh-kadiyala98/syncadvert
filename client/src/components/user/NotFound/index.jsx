import React from 'react';
import { useHistory } from 'react-router-dom';

import NavBar from '../NavBar';
import Footer from '../Footer';

import './style.css'

const NotFound = () => {
    const history = useHistory()

    return ( 
        <React.Fragment>
            <div className="not-found">
                <NavBar />
                <div className="container">
                    <div className="text-center">
                        <h1>404</h1>
                        <h3>Page Not Found</h3>
                        <p className="text-muted">Let me take you back to the home page.</p>
                        <button onClick={() => history.push(`/home`)} className="btn btn-lg">HOME</button>
                    </div>
                </div>
            </div>
            <Footer />
        </React.Fragment>
     );
}
 
export default NotFound;