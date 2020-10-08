import React, { useState } from 'react';

import BlogList from './blogList'
import CreateBlog from './createBlog';
import EditBlog from './editBlog';

import './style.css'

const Blog = (props) => {
    const {blogId} = props
    const [blogList, showBlogList] = useState(true)
    
    return ( 
        <React.Fragment>
            {blogId ? 
                <EditBlog blogId={blogId} /> :
                blogList ?
                    <React.Fragment>
                        <div className="flex-end mr-3">
                            <button onClick={() => showBlogList(false)} className="btn btn-light mb-3">
                                New Blog
                            </button>
                        </div>

                        <BlogList />
                    </React.Fragment> :
                    <React.Fragment>
                        <div className="flex-end mr-3">
                            <button onClick={() => showBlogList(true)} className="btn btn-light mb-3">
                                Existing Blogs
                            </button>
                        </div>

                        <CreateBlog />
                    </React.Fragment>
            }

        </React.Fragment>
    );
}
 
export default Blog;