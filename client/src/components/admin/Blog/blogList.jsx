import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchBlogs, getBlogs } from '../../../store/blogs';
import {s3BucketName} from '../../../config.json'

import './style.css'
import Loader from './../../Loader/index';

const BlogList = () => {
    const dispatch = useDispatch()

    const blogs = useSelector(getBlogs)
    const { list: blogList, loading } = blogs

    useEffect(() => {
        dispatch(fetchBlogs())
    }, [dispatch])

    if (loading)
        return <Loader />

    return ( 
        <section className="admin-blogs">
                <div className="card-columns">
                    {blogList.map(blog =>
                        <Link to={"/adminBlog/" + blog._id} key={blog._id} className="card">
                            <img className="card-img-top" src={s3BucketName + blog.headerImg} alt="" />
                            <div className="card-body">
                                <h4 className="card-title">{blog.title.slice(0, 30) + '...'}</h4>
                                <p className="card-text">{blog.subTitle.slice(0, 100) + '...'}</p>
                            </div>
                        </Link>
                    )}
                </div>
        </section>
    );
}
 
export default BlogList;