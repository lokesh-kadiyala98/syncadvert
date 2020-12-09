import React from 'react';
import axios from 'axios'
import Joi from 'joi-browser'
import { toast } from 'react-toastify';

import Form from './../../Form/form';
import './style.css'

class Contact extends Form {

    constructor(props) {
        super(props)

        this.baseState = this.state
    }

    state = { 
        data: {
            name: '',
            contact: '',
            email: '',
            reference: '',
            occasion: '',
            message: ''
        },
        loading: false,
        errors: {}
    }

    schema = {
        name: Joi.string().label('Name'),
        contact: Joi.number().label('Contact Number'),
        email: Joi.string().email({ minDomainSegments: 3, tlds: { allow: ['com'] } }).label('Email').min(8).max(30).allow(''),
        reference: Joi.string(),
        occasion: Joi.string(),
        message: Joi.string().allow('')
    }

    doSubmit = async () => {
        this.setState({ loading: true })
        const {data} = this.state
        const {status, data: responseData} = await axios.post('/admin/sendContactMail', data)

        if (status === 200) {
            toast(responseData.message)
            this.setState(this.baseState)
        } else
            toast.warning(responseData.message)
        
        this.setState({ loading: false })
    }

    render() { 
        const referenceOptions = [
            {_id: '', name: 'How did you know about us?'},
            {_id: 'advertisement', name: 'Advertisement'},
            {_id: 'colleague', name: 'Colleague'},
            {_id: 'family', name: 'Family'},
            {_id: 'friend', name: 'Friend'},
            {_id: 'others', name: 'Others'}
        ]

        const occasionOptions = [
            {_id: '', name: 'Choose your occasion'},
            {_id: 'ad shoot', name: 'Ad Shoot'},
            {_id: 'birthday', name: 'Birthday'},
            {_id: 'baby shoot', name: 'Baby Shoot'},
            {_id: 'marriage', name: 'Marriage'},
            {_id: 'others', name: 'Others'}
        ]

        return ( 
            <section className="container set-padding user-form">
                <h2 className="text-center underlined-heading">Let's Get in Touch</h2>
                
                <div className="row p-2 mt-5">
                    <div className="col-md-6">
                        {this.renderInput('name', 'Name')}
                        {this.renderInput('email', 'Email')}
                        {this.renderInput('contact', 'Contact No')}
                    </div>
                    <div className="col-md-6">
                        {this.renderSelect('occasion', '', occasionOptions)}
                        {this.renderSelect('reference', '', referenceOptions)}
                        {this.renderTextArea('message', 'Message', 4)}
                    <div className="btn-grp">
                        {this.state.loading ?
                            this.renderLoadingButton('Sending...') :
                            this.renderButton('Send', 'btn-submit')
                        }
                    </div>
                    </div>
                </div>
                
            </section>
        );
    }
}
 
export default Contact;