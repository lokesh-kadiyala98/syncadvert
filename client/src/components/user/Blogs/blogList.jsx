import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loader from './../../Loader'

import { fetchBlogs, getBlogs } from '../../../store/blogs';
import {s3BucketName} from '../../../config.json'
import { Link } from 'react-router-dom';

const BlogList = () => {
    const dispatch = useDispatch()

    const blogs = useSelector(getBlogs)

    useEffect(() => {
        dispatch(fetchBlogs())
    }, [dispatch])

    const {list: blogList, loading} = blogs

    if (loading)
        return <Loader />

    return ( 
        <section className="user-blogs set-padding">
            <div className="container">
                <div className="card-columns card-columns-3">
                    {blogList.map(blog =>
                        <Link to={"/blog/" + blog._id} key={blog._id} className="card">
                            <img className="card-img-top" src={s3BucketName + blog.headerImg} alt="" />
                            <div className="card-body">
                                <h4 className="card-title">{blog.title}</h4>
                                <p className="card-text">{blog.subTitle.slice(0, 100) + '...'}</p>
                            </div>
                        </Link>
                    )}
                </div>
            </div>
        </section>
    );
}
 
export default BlogList;