import React from 'react';

import NavBar from '../../components/user/NavBar';
import Quote from './../../components/user/Quote';
import Testimonials from '../../components/user/Testimonial';
import CategoriesMicro from './../../components/user/CategoriesMicro'
import Footer from '../../components/user/Footer';

const About = () => {
    return ( 
        <React.Fragment>
            <NavBar />
            <Quote />
            <Testimonials />
            <CategoriesMicro />
            <Footer />
        </React.Fragment>
    );
}
 
export default About;