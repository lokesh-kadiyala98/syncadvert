import React from 'react';
import Joi from 'joi-browser'
import { connect } from 'react-redux'

import { s3BucketName } from './../../../config.json'
import UploadImage from './../../Form/uploadImage';
import Form from './../../Form/form';
import { updateMember } from './../../../store/team';

class EditForm extends Form {
    state = { 
        data: {
            img: '',
            name: '',
            role: '',
            instagram: '',
            twitter: '',
            facebook: ''        
        },
        loading: false,
        errors: {}
    }

    schema = {
        img: Joi.string().label('Image').allow(''),
        name: Joi.string().label('Name').max(15).required(),
        role: Joi.string().label('Name').max(20).required(),
        instagram: Joi.string().label('Instagram').allow(''),
        facebook: Joi.string().label('Facebook').allow(''),
        twitter: Joi.string().label('Twitter').allow('')
    }

    componentDidMount() {
        this.fillState()
    }
    
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.e.img !== this.props.e.img) {
            this.fillState()
        }
    }

    fillState = () => {
        const {e: entity} = this.props
        const data = {...this.state.data}
        data.instagram = ''
        data.facebook = ''
        data.twitter = ''

        Object.keys(entity).forEach(key => {
            if (key === 'socialLinks' && entity[key].length > 0) {
                Object.keys(entity[key]).forEach(innerKey => {
                    Object.keys(entity[key][innerKey]).forEach(innerMostKey => {
                        if (innerMostKey !== "_id")
                            data[innerMostKey] = entity[key][innerKey][innerMostKey]
                    })
                })
            } else if (key === 'name' || key === 'role') {
                data[key] = entity[key]
            }
        })

        this.setState({ data })
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

        if (payload.img === '')
            delete payload.img

        this.props.update(this.props.e._id, payload)
    }       

    render() { 
        const { e: entity } = this.props
        const {img} = this.state.data
        let imgSrc = s3BucketName + entity.img

        return ( 
            <React.Fragment>
                <div className="p-2 mt-5">

                    <div className="profile-img-container">
                        <img 
                            className={img ? "admin-profile-img inactive" : "admin-profile-img"} 
                            src={imgSrc} 
                            alt={entity.name} 
                        />
                    </div>

                    <div className="row">
                        <div className="col-sm-12">
                            <UploadImage
                                allowMultiple={false}
                                labelIdle='Drop image or <span class="filepond--label-action">Browse</span>'
                                aspectRatio='3:4'
                                nameSpace='team'
                                onSuccess={this.handleImageUploadSuccess}
                                onRevert={this.handleImageUploadRevert}
                            />
                        </div>
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
                    {this.renderButton('Save', 'btn-login')}
                </div>
            </React.Fragment>
        );
    }
}
 
const mapStateToProps = state => ({
    
})

const mapDispatchToProps = dispatch => ({
    update: (_id, data) => dispatch(updateMember(_id, data))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditForm);