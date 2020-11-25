import React from 'react';
import { useDispatch } from 'react-redux';

import Loader from './../../Loader';
import { s3BucketName } from './../../../config.json'
import './style.css'
import { deleteCareer } from './../../../store/careers';

const ItemList = ({ list, loading }) => {
    const dispatch = useDispatch()


    const onHandleDelete = ({ _id, role }) => {
        if (window.confirm(`Do you really want to DELETE ${role}?`))
            dispatch(deleteCareer(_id))
    }

    if (loading)
        return <Loader />

    return ( 
        <section className="career-list">
            {list.map(item => 
                <article className="media mb-3 career-item" key={item._id}>
                    <i className="fa fa-trash" onClick={() => onHandleDelete(item)}></i>
                    <img src={s3BucketName + item.flyer} className="mr-3" alt={item.role} />
                    <div className="media-body">
                        <h5>{item.role}</h5>
                        <p>{item.location}</p>
                    </div>
                </article>
            )}
        </section>
    );
}
 
export default ItemList;