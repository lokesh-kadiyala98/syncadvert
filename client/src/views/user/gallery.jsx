import React from 'react';

import NavBar from '../../components/user/NavBar';
import Collage from '../../components/user/Collage';
import FixedCTA from '../../components/user/FixedCTA';
import Footer from '../../components/user/Footer';

const Gallery = (props) => {
    const { category } = props.match.params

    return ( 
        <React.Fragment>
            <NavBar />
            <Collage
                category={category}
            />
            <FixedCTA />
            <Footer />
        </React.Fragment>
    );
}
 
export default Gallery;