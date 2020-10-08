import React from 'react';
import Joi from 'joi-browser'
import { Redirect } from 'react-router-dom';

import Form from '../Form/form';

import authService from '../../services/authService';

class Login extends Form {
    constructor(props) {    
        super(props)

        this.baseState = this.state
    }

    state = { 
        data: {
            email: '',
            password: ''
        },
        loading: false,
        errors: {},
        redirectToReferer: false
    }

    schema = {
        email: Joi.string().label('Email').min(8).max(30).required(),
        password: Joi.string().label('Password').min(6).max(15).required()
    }

    doSubmit = async () => {
        this.setState({ loading: true })
        const { email, password } = this.state.data

        try {
            const responseStatusCode = await authService.login(email, password)

            if (responseStatusCode === 200) {
                authService.setHTTPJwt()
                this.setState({ redirectToReferer: true })
            }
        } catch (ex) {
            const errors = {...this.state.errors}
            errors.email = ex.response.data
            this.setState({ errors, loading: false })
        }
    }
    
    render() { 
        const path = this.props.onSuccess || '/admin'
        if (this.state.redirectToReferer)
            return <Redirect to={path} />
        
        return ( 
            <div className="container pt-5">
                <h1 className="text-center underlined-heading">Admin Login</h1>
                {this.renderInput('email', 'Email', 'email')}
                {this.renderInput('password', 'Password', 'password')}   
                <div className="btn-grp">
                    {this.renderCancelButton('Cancel', 'btn-cancel')}
                    {this.state.loading?
                        this.renderLoadingButton(' Loading')
                        :
                        this.renderButton('Login', 'btn-login')
                    }
                </div>             

            </div>
        );
    }
}
 
export default Login;