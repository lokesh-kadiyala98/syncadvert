import React from 'react';

import NavBar from './../../components/user/NavBar';
import BlogList from '../../components/user/Blogs/blogList';
import BlogContent from '../../components/user/Blogs';
import FixedCTA from './../../components/user/FixedCTA';
import Footer from './../../components/user/Footer';

const Blog = (props) => {
    const {blogId} = props.match.params
    
    return ( 

        <React.Fragment>
            <NavBar />
            {blogId ?
                <BlogContent blogId={blogId} /> :
                <BlogList />
            }
            <FixedCTA />
            <Footer />
        </React.Fragment>
    );
}
 
export default Blog;