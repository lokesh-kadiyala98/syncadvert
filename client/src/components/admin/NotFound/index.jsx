import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return ( 
        <React.Fragment>
            <div className="not-found">
                <div className="container">
                    <div className="text-center">
                        <h1>404</h1>
                        <h3>Blog Not Found</h3>
                        <p className="text-muted">Let me take you back to the blogs page.</p>
                        <Link to='/adminBlog' className="btn btn-lg">
                            <i class="fas fa-arrow-left mr-3" aria-hidden="true"></i>
                            Blogs
                        </Link>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
 
export default NotFound;