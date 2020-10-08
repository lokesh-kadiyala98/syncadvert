import React from 'react';

import NavBar from '../../components/admin/NavBar'
import Header from './../../components/admin/Header'
import Footer from './../../components/admin/Footer'
import UnderWork from './../../components/user/UnderWork';

const Blog = () => {
    return ( 
        <React.Fragment>
            <div className="admin-view">
                <NavBar />
                <main>
                    <Header />
                    <UnderWork />
                </main>
            </div>
            <Footer />
        </React.Fragment>
    );
}
 
export default Blog;