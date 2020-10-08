import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchTestimonials, getTestimonials } from './../../../store/testimonials';

import {s3BucketName} from './../../../config.json'
import './style.css'

const Testimonials = () => {
    const dispatch = useDispatch()

    const [i, setIndex] = useState(0)
    const [length, setLength] = useState(0)

    const testimonials = useSelector(getTestimonials)

    useEffect(() => {
        dispatch(fetchTestimonials())
    }, [dispatch])

    useEffect(() => {
        setLength(testimonials.length)
    }, [testimonials])

    const handleTestimonialChange = (pivot) => {
        const changeIndex = i + pivot
        if (changeIndex < 0)
            setIndex(length - 1)
        else if (changeIndex >= length)
            setIndex(0)
        else
            setIndex(changeIndex)
    }

    return ( 
        <section className="user-testimonials">
            <div className="container set-padding">
                <div className="row set-padding testimonial-area">
                    <div className="col-sm-12 col-lg-6">
                        <h1>What <br/>Our Clients <br/>Say</h1>
                    </div>
                    <div className="col-sm-12 col-lg-6">
                        {testimonials.length > 0 && <div className="testimonial">
                            <span className="number">
                                <span className="currrent-number">
                                    {i < 8 ? "0"+(i+1) : i}
                                </span>
                                <span className="total-number">
                                    {"/"+length}
                                </span>
                            </span>
                            <p className="story">{testimonials[i].story}</p>
                            <div className="footer">
                                <div className="details">
                                    <div className="img">
                                        <img src={s3BucketName + testimonials[i].img} 
                                            alt={testimonials[i].name} />
                                        <span className="name">{testimonials[i].name}</span>
                                    </div>
                                </div>
                                <div className="pagination">
                                    <i onClick={() => handleTestimonialChange(-1)} className={i===0 ? "arrow-left disabled" : "arrow-left"}>
                                        <span></span>
                                        <span></span>
                                    </i>
                                    <i onClick={() => handleTestimonialChange(1)} className={i===length - 1 ? "arrow-right disabled" : "arrow-right"}>
                                        <span></span>
                                        <span></span>
                                    </i>
                                </div>
                            </div>    
                        </div>}    
                    </div>    
                </div> 
            </div>
        </section>
    );
}
 
export default Testimonials;