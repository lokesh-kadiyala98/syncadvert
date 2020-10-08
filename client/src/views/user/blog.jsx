import React from 'react';

import NavBar from './../../components/user/NavBar';
import Footer from './../../components/user/Footer';
import UnderWork from './../../components/user/UnderWork/index';

const Blog = () => {
    return ( 
        <React.Fragment>
            <NavBar />
            <UnderWork />
            <Footer />
        </React.Fragment>
    );
}
 
export default Blog;