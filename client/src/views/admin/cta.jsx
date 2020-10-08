import React from 'react';

import NavBar from '../../components/admin/NavBar';
import Header from './../../components/admin/Header/index';
import CTAForm from './../../components/admin/ctaForm';
import Footer from './../../components/admin/Footer/index';

const Careers = () => {
    return (
        <React.Fragment>
            <div className="admin-view">
                <NavBar />
                <main>
                    <Header />
                    <CTAForm />
                </main>
            </div>
            <Footer />
        </React.Fragment>  
    );
}
 
export default Careers;