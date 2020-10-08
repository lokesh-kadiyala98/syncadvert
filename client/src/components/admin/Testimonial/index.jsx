import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AddForm from './addForm';
import Modal from '../../Modal';
import { fetchTestimonials, getTestimonials, deleteTestimonial } from './../../../store/testimonials';

import {s3BucketName} from './../../../config.json'
import './style.css'

const Testimonials = () => {
    const dispatch = useDispatch()
    const [addTestimonial, addTestimonialToogler] = useState(false)

    const testimonails = useSelector(getTestimonials)

    useEffect(() => {
        dispatch(fetchTestimonials())
    }, [dispatch])

    const onHandleDelete = ({ _id, name }) => {
        if (window.confirm(`Would you really want to DELETE ${name}'s testimonial?`)) 
            dispatch(deleteTestimonial(_id))
    }

    return ( 
        <section className="testimonial">
            <h1 className="text-center underlined-heading">Testimonials</h1>

            <div className="row mb-5">
                <div className="col-12 mb-3 mt-3 add-member">
                    <button onClick={() => addTestimonialToogler(true)} className="btn-dbl btn btn-lg">
                        Add Testimonial
                        <i className="fa fa-plus"></i>
                    </button>
                </div>
            </div>

            {testimonails && testimonails.map(testimonial => 
                <div className="media" key={testimonial._id}>
                    <img className="mr-3 align-self-center" src={s3BucketName + testimonial.img} alt={testimonial.name} />
                    <div className="overlay align-self-center">
                        <i className="fa fa-trash" onClick={() => onHandleDelete(testimonial)}></i>
                    </div>
                    <div className="media-body">
                        <h5>{testimonial.name}</h5>
                        <p>{testimonial.story}</p>
                    </div>
                </div>
            )}

            <Modal modal={addTestimonial} 
                overlayClassName="Overlay" 
                onCancel={() => addTestimonialToogler(false)}
            >
                <AddForm onCancel={() => addTestimonialToogler(false)} />
            </Modal>
        </section>
    );
}
 
export default Testimonials;