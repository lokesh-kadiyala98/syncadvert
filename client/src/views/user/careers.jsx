import React from 'react';

import NavBar from '../../components/user/NavBar';
import CareersList from '../../components/user/CareersList';
import FixedCTA from '../../components/user/FixedCTA';
import Footer from '../../components/user/Footer';

const Careers = () => {
    return ( 
        <React.Fragment>
            <NavBar />
            <CareersList />
            <FixedCTA />
            <Footer />
        </React.Fragment>
    );
}
 
export default Careers;