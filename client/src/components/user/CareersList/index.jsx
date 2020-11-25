import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchCareers, getCareers } from './../../../store/careers';
import {s3BucketName} from './../../../config.json'

import Loader from '../../Loader';
import './style.css'

const Careers = () => {
    const dispatch = useDispatch()
    
    const careers = useSelector(getCareers)
    const {list: items, loading} = careers
    console.log(items, loading)
    useEffect(() => {
        dispatch(fetchCareers())
    }, [dispatch])

    if (loading)
        return <Loader />

    // const items = [
    //     {flyer: "careers/97ff7e00-2f1e-11eb-903d-1747030b1ada.jpeg",
    //     location: "Bangalore",
    //     role: "Developer",
    //     __v: 0,
    //     _id: "5fbe561ffa2cd81cecf82e74"}
    // ]

    return ( 
        <section className="container set-padding">
            {items.map(item =>
                <div className="career" key={item._id}>
                    <div className="pin"></div>
                    <div className="content">
                        <div className="text mb-3">
                            <h5 className="mb-0">{item.role}</h5>
                            <p className="mb-0">{item.location}</p>
                        </div>
                        <img src={s3BucketName + item.flyer} alt={'career flyer'} />
                    </div>
                </div>
            )}
        </section>
    );
}
 
export default Careers;