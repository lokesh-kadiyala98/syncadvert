import React from 'react';

import NavBar from '../../components/user/NavBar';
import Quote from './../../components/user/Quote';
import AboutText from './../../components/user/AboutText';
import CategoriesMicro from './../../components/user/CategoriesMicro'
import FixedCTA from './../../components/user/FixedCTA';
import Footer from '../../components/user/Footer';

const About = () => {
    return ( 
        <React.Fragment>
            <NavBar />
            <Quote />
            <AboutText />
            <CategoriesMicro />
            <FixedCTA />
            <Footer />
        </React.Fragment>
    );
}
 
export default About;