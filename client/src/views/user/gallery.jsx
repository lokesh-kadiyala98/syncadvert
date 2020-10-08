import React from 'react';

import NavBar from '../../components/user/NavBar';
import Footer from '../../components/user/Footer';
import Collage from '../../components/user/Collage';

const Gallery = (props) => {
    const { category } = props.match.params

    return ( 
        <React.Fragment>
            <NavBar />
            <Collage
                category={category}
            />
            <Footer />
        </React.Fragment>
    );
}
 
export default Gallery;