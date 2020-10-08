import React, { Component } from 'react';
import Joi from 'joi-browser';

import Input from './input';
import TextArea from './textArea';
import Select from './select';
import UploadImage from './uploadImage';
import './style.css'

class Form extends Component {
    state = { 
        data: {},
        errors: {},
    };

    handleChange = e => {
        const errors = {...this.state.errors};
        
        const errorMessages = this.validateProperty(e.currentTarget);

        if(errorMessages) errors[e.currentTarget.name] = errorMessages;
        else delete errors[e.currentTarget.name];

        const data = {...this.state.data};
        data[e.currentTarget.name] = e.currentTarget.value;
        
        this.setState({ data, errors });
    };
    
    validateProperty = input => {
        const obj = { [input.name]: input.value };
        const schema = { [input.name]: this.schema[input.name] };
        const {error} = Joi.validate(obj, schema);
        return error ? error.details[0].message : null;
    };

    validate = () => {
        const results = Joi.validate(this.state.data, this.schema, { abortEarly: false });
        
        if(!results.error) return null;

        const errors = {}; 
        for (let item of results.error.details)
            errors[item.path[0]] = item.message;

        return errors;
    };

    handleSubmit = e => {
        e.preventDefault();
        
        const errors = this.validate();
    
        this.setState({ errors: errors || {} });

        if (errors) return;
        
        this.doSubmit();
    };

    renderImageUpload(allowMultiple = false, labelIdle = 'Drag & Drop image file or <span class="filepond--label-action">Browse</span>') {
        return (
            <UploadImage
                allowMultiple={allowMultiple}
                labelIdle={labelIdle}
            />
        )
    }

    renderInput(name, label, type='text') {
        const { data, errors } = this.state;
        
        return (
            <Input 
                type={type}
                name={name}
                value={data[name]}
                onChange={this.handleChange}
                label={label}
                error={errors[name]} 
            />
        )
    };

    renderSelect(name, label, options) {
        const { data, errors } = this.state;

        return (
            <Select 
                name={name}
                value={data[name]}
                onChange={this.handleChange}
                options={options}
                label={label}   
                error={errors[name]} 
            />
        )
    };

    renderTextArea(name, label, rows) {
        const { data , errors } = this.state;

        return (
            <TextArea
                name={name}
                rows={rows}
                value={data[name]}
                onChange={this.handleChange}
                label={label}
                error={errors[name]}
            />
        )
    }

    renderButton(label, classNames) {
        return (
            <button type="submit" onClick={(e) => this.handleSubmit(e)} className={"btn " + classNames}>
                {label}
            </button>
        );
    };

    renderCancelButton(label, classNames) {
        return (
            <button type="submit" onClick={this.props.onCancel} className={"btn " + classNames}>
                {label}
            </button>
        );
    };

    renderLoadingButton(label) {
        return (
            <button className="btn btn-login float-right" type="button" disabled>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                {label}
            </button>
        )
    }
}
 
export default Form;