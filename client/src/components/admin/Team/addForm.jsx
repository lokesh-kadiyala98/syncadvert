import React from 'react';
import { connect } from 'react-redux'
import Joi from 'joi-browser'

import { apiEndpoint, s3BucketName } from '../../../config.json'
import httpService from './../../../services/httpService'
import UploadImage from '../../Form/uploadImage'
import { addMember } from '../../../store/team'
import Form from './../../Form/form';

class AddForm extends Form {
    constructor(props) {    
        super(props)

        this.baseState = this.state
    }

    state = { 
        data: {
            img: '',
            name: '',
            role: '',
            instagram: '',
            facebook: '',
            twitter: ''
        },
        loading: false,
        errors: {}
    }

    schema = {
        img: Joi.string().label('Image').required(),
        name: Joi.string().label('Name').max(15).required(),
        role: Joi.string().label('Name').max(20).required(),
        instagram: Joi.string().label('Instagram').allow(''),
        facebook: Joi.string().label('Facebook').allow(''),
        twitter: Joi.string().label('Twitter').allow('')
    }

    componentWillUnmount() {
        const data = {...this.state.data}
        if (data.img)
            httpService.delete(apiEndpoint + '/admin/activities/uploads', {
                params: {
                    Key: data.img
                }
            })
    }

    doSubmit = async () => {
        // this.props.clearErrors()
        
        const payload = {
            name: "",
            role: "",
            socialLinks: []
        }
        const {data} = this.state
        
        Object.keys(data).forEach(key => {
            if (key === 'instagram' || key === 'facebook' || key === 'twitter') {
                if (data[key] !== '')
                    payload.socialLinks.push({ [key]: data[key] })
            } else 
                payload[key] = data[key]
        })

        this.props.addMember(payload)

        this.setState(this.baseState)
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

    render() {
        const {img} = this.state.data

        return ( 
            <div className="p-2 mt-5">

                {img ?
                    <div className="profile-img-container">
                        <img 
                            className="admin-profile-img" 
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
                            aspectRatio='3:4'
                            nameSpace='team'
                            onSuccess={this.handleImageUploadSuccess}
                            onRevert={this.handleImageUploadRevert}
                        />
                    </div>
                </div>

                {this.renderInput('name', 'Name')}
                {this.renderInput('role', 'Role')}
                {this.renderInput('instagram', 'Instagram')}
                {this.renderInput('facebook', 'Facebook')}
                {this.renderInput('twitter', 'Twitter')}

                <p className="mt-2" style={{fontSize: '16px', color: 'rgb(142 135 46)'}}>
                    Note: Prepend URLs with 
                    <span style={{borderRadius: '5px', backgroundColor: 'rgb(142 135 46)', color: '#21250A', padding: '0 5px', margin: '0 4px'}}>
                        https://www
                    </span>
                </p>

                <div className="btn-grp">
                    {this.renderCancelButton('Cancel', 'btn-cancel')}
                    {this.renderButton('Add', 'btn-login')}
                </div>
                
            </div>
        );
    }
}

const mapStateToProps = state => ({
    
})

const mapDispatchToProps = dispatch => ({
    addMember: member => dispatch(addMember(member)) 
})

export default connect(mapStateToProps, mapDispatchToProps)(AddForm)