import React from 'react';

import NavBar from '../../components/admin/NavBar';
import Header from './../../components/admin/Header';
import Careers from './../../components/admin/Careers';
import Footer from './../../components/admin/Footer';

const CareersView = () => {
    return (
        <React.Fragment>
            <div className="admin-view">
                <NavBar />
                <main>
                    <Header />
                    <Careers />
                </main>
            </div>
            <Footer />
        </React.Fragment>  
    );
}
 
export default CareersView;