import React from 'react';
import { connect } from 'react-redux'
import Joi from 'joi-browser'

import Form from '../../Form/form';
import UploadImage from '../../Form/uploadImage'

import { addCareer } from './../../../store/careers'

class CareersForm extends Form {
    state = { 
        data: {
            role: '',
            location: '',
            flyer: ''
        },
        loading: false,
        errors: {}
    }

    schema = {
        role: Joi.string().label('Role').required(),
        location: Joi.string().label('Location').required(),
        flyer: Joi.string().label('Flyer').required()
    }

    handleImageUploadSuccess = (img) => {
        const data = {...this.state.data}
        data.flyer = img 
        this.setState({ data })
    }

    handleImageUploadRevert = () => {
        const data = {...this.state.data}
        data.flyer = '' 
        this.setState({ data })
    }

    doSubmit = async () => {
        const {data} = this.state
        this.props.addCareer(data)
    }

    render() { 
        return ( 
            <section className="p-2 mt-5">
                <UploadImage
                    allowMultiple={false}
                    labelIdle='Drop flyer or <span class="filepond--label-action">Browse</span>'
                    nameSpace='careers'
                    onSuccess={this.handleImageUploadSuccess}
                    onRevert={this.handleImageUploadRevert}
                />

                {this.renderInput('role', 'Role')}
                {this.renderInput('location', 'Location')}
                
                <div className="btn-grp">
                    {this.renderCancelButton('Close', 'btn-cancel')}
                    {this.renderButton('Add', 'btn-login')}
                </div>

            </section>
        );
    }
}

const mapStateToProps = state => ({
    
})

const mapDispatchToProps = dispatch => ({
    addCareer: career => dispatch(addCareer(career)) 
})
 
export default connect(mapStateToProps, mapDispatchToProps)(CareersForm);