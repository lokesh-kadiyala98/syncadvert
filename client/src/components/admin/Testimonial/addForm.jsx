import React from 'react';
import { connect } from 'react-redux'
import Joi from 'joi-browser'

import { s3BucketName } from '../../../config.json'
import UploadImage from '../../Form/uploadImage';
import Form from '../../Form/form';
import { addTestimonial, testimonialsClearErrors, getTestimonialErrors } from '../../../store/testimonials';

class AddForm extends Form {
    state = { 
        data: {
            img: '',
            name: '',
            story: ''
        },
        errors: {}
    }

    schema = {
        img: Joi.string().label('Image').required(),
        name: Joi.string().label('Name').max(15).required(),
        story: Joi.string().label('Story').max(200).required()
    }

    handleImageUploadSuccess = (img) => {
        const data = {...this.state.data}
        data.img = img 
        this.setState({ data })
    }

    handleImageUploadRevert = () => {
        const data = {...this.state.data}
        data.img = '' 
        this.setState({ data })
    }

    doSubmit = async () => {
        const {data} = this.state

        this.props.addTestimonial(data)
    }

    render() { 
        const {img} = this.state.data

        return ( 
            <div className="p-2 mt-5">

                {img ?
                    <div className="profile-img-container">
                        <img 
                            className="profile-img" 
                            src={s3BucketName + img} 
                            alt="preview" 
                        />
                    </div>:
                    null
                }

                <div className="row">
                    <div className="col-sm-12">
                        <UploadImage 
                            allowMultiple={false}
                            labelIdle='Drop image or <span class="filepond--label-action">Browse</span> to Upload'
                            aspectRatio='1:1' 
                            outputQuality='10'
                            nameSpace='testimonials' 
                            onSuccess={this.handleImageUploadSuccess}
                            onRevert={this.handleImageUploadRevert} />
                    </div>
                </div>

                {this.renderInput('name', 'Name')}
                {this.renderTextArea('story', 'Story', 5)}

                <div className="btn-grp">
                    {this.renderCancelButton('Close', 'btn-cancel')}
                    {this.renderButton('Save', 'btn-login')}
                </div>

            </div>
        );
    }
}

const mapStateToProps = state => ({
    errors: getTestimonialErrors(state)
})

const mapDispatchToProps = dispatch => ({
    addTestimonial: testimonial => dispatch(addTestimonial(testimonial)),
    clearErrors: () => dispatch(testimonialsClearErrors())
})

export default connect(mapStateToProps, mapDispatchToProps)(AddForm);