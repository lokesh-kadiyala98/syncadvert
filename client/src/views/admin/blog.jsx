import React from 'react';

import NavBar from '../../components/admin/NavBar'
import Header from './../../components/admin/Header'
import BlogComponent from '../../components/admin/Blog';
import Footer from './../../components/admin/Footer'

const Blog = (props) => {
    const {blogId} = props.match.params
    return ( 
        <React.Fragment>
            <div className="admin-view">
                <NavBar />
                <main>
                    <Header />
                    <BlogComponent blogId={blogId} />
                </main>
            </div>
            <Footer />
        </React.Fragment>
    );
}
 
export default Blog;