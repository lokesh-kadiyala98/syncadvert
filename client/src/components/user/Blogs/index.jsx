import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import htmlReactParser from 'html-react-parser'

import Loader from '../../Loader'

import {s3BucketName} from './../../../config.json'

const Blog = ({ blogId }) => {
    const [blog, setBlog] = useState({})
    const [loading, isLoading] = useState(true)

    useEffect(() => {
        async function fetchBlog () {
            
            try {
                const {data} = await axios.get('/admin/activities/blogs/' + blogId)
                
                delete data._id
                delete data.__v

                setBlog(data)
            } catch (e) {
                if (e.response.status)
                    this.setState({ notFound: true })
            }
            isLoading(false)
        }
        fetchBlog()
    }, [blogId])

    const {title, headerImg, subTitle, body} = blog

    if (loading)
        return <Loader />

    return ( 
        <div className="blog-container">
            <div className="blog-content">
                                    
                <div className="blog-header mt-5 mb-3">
                    <Link className="btn btn-brand text-dark" to="/blog">
                        <i className="fas fa-arrow-left mr-2"></i> Blogs
                    </Link>
                </div>

                <h1 className="mb-3">{title}</h1>

                <img src={s3BucketName + headerImg} alt="blog content" />
                                        
                <p className="text-muted text-center mt-3 mb-5">{subTitle}</p>

                <div className="body">{body && htmlReactParser(body)}</div>

            </div>
        </div>
    );
}
 
export default Blog;