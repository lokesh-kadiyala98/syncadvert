import React from 'react';
import Joi from 'joi-browser'
import { connect } from 'react-redux'

import { apiEndpoint, s3BucketName } from './../../config.json'
import httpService from './../../services/httpService'
import UploadImage from '../Form/uploadImage';
import Form from '../Form/form';

import { fetchAdminProfile, getAdminProfile, getAdminErrors, updateAdminProfile, adminClearErrors } from '../../store/auth';

class Profile extends Form {
    constructor(props) {    
        super(props)

        this.baseState = this.state
    }

    state = { 
        data: {
            img: '',
            email: '',
            name: '',
            password: '',
            validationPassword: ''
        },
        loading: false,
        errors: {}
    }

    schema = {
        img: Joi.string().allow(''),
        email: Joi.string().email({ minDomainSegments: 3, tlds: { allow: ['com'] } }).label('Email').min(8).max(30).allow(''),
        name: Joi.string().label('Name').min(4).max(15).allow(''),
        password: Joi.string().label('New Password').min(4).max(15).allow(''),
        validationPassword: Joi.string().label('Validation Password').required()
    }

    componentDidMount() {
        this.props.fetch()
        const {admin} = this.props
        if (Object.keys(admin).length > 0) {
            this.fillState()
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.admin !== this.props.admin) {
            this.fillState()
        }
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

    fillState = () => {
        const {email, name} = this.props.admin
        const data = {...this.state.data}

        data.email = email
        data.name = name
        data.validationPassword = ''
        this.setState({ data })
    }

    doSubmit = async () => {
        this.props.clearErrors()
        
        const payload = {}
        const {data: stateData} = this.state
        const {admin} = this.props
        const data = {...this.props.data}

        //iterate state[data] and accumulate to payload only values that have changed
        Object.keys(stateData).forEach(key => {
            if (stateData[key] !== admin[key])
                payload[key] = stateData[key]
        })
        
        //if new password & img is not given delete them
        if (payload.password === '' || payload.img === '')
            delete payload.password

        if (payload.email || payload.name || payload.password || payload.img) {
            this.props.update(payload)
            data.img = ''
            this.setState({ data })
        }
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
        const { admin } = this.props
        const {img} = this.state.data
        let imgSrc = s3BucketName + admin.img
        
        return ( 
            <React.Fragment>
                <h1 className="text-center underlined-heading">Profile Settings</h1>
                <div className="p-2 mt-5">

                    <div className="profile-img-container">
                        <img 
                            className={img ? "profile-img inactive" : "profile-img"} 
                            src={admin.img ? imgSrc : "https://sync-advert.s3.ap-south-1.amazonaws.com/avatar.png"} 
                            alt="admin" 
                        />
                    </div>
                        
                    <UploadImage
                        allowMultiple={false}
                        labelIdle='Drop image or <span class="filepond--label-action">Browse</span>'
                        aspectRatio='1:1'
                        nameSpace='admin'
                        onSuccess={this.handleImageUploadSuccess}
                        onRevert={this.handleImageUploadRevert}
                    />

                    {this.renderInput('email', 'Email', 'text')}
                    {this.renderInput('name', 'Name')}                    
                    {this.renderInput('password', 'Change Password', 'password')}
                    {this.renderInput('validationPassword', '*Current Password', 'password')}  
                    {this.props.errors &&
                        <div className="alert alert-warning">
                            <p className="mb-0" style={{fontSize: '16px'}}>{this.props.errors}</p>
                        </div>
                    }
                    <div className="btn-grp">
                        {this.state.loading ?
                            this.renderLoadingButton(' Loading') :
                            this.renderButton('Update', 'btn-submit')
                        }
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    admin: getAdminProfile(state),
    errors: getAdminErrors(state)
})

const mapDispatchToProps = dispatch => ({
    fetch: () => dispatch(fetchAdminProfile()),
    update: admin => dispatch(updateAdminProfile(admin)),
    clearErrors: () => dispatch(adminClearErrors())
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)