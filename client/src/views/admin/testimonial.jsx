import React from 'react';

import NavBar from '../../components/admin/NavBar'
import Header from '../../components/admin/Header'
import Testimonials from '../../components/admin/Testimonial';
import Footer from '../../components/admin/Footer'

const TestimonialView = () => {
    return ( 
        <React.Fragment>
            <div className="admin-view">
                <NavBar />
                <main>
                    <Header />
                    <Testimonials />
                </main>
            </div>
            <Footer />
        </React.Fragment>
    );
}
 
export default TestimonialView;