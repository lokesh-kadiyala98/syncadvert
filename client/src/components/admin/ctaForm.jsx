import React from 'react';
import Joi from 'joi-browser'
import { connect } from 'react-redux'

import Form from './../Form/form';
import { getCTAErrors, updateCTA, ctaClearErrors, fetchCTA, getCTALinks } from './../../store/cta';

class CTAForm extends Form {
    constructor(props) {    
        super(props)

        this.baseState = this.state
    }

    state = { 
        data: {
            instagram: '',
            youtube: '',
            facebook: '',
            email: '',
            whatsapp: ''
        },
        loading: false,
        errors: {} 
    }

    schema = {
        instagram: Joi.string().allow(''),
        youtube: Joi.string().allow(''),
        facebook: Joi.string().allow(''),
        email: Joi.string().email({ minDomainSegments: 3, tlds: { allow: ['com'] } }).label('Email').min(8).max(30).allow(''),
        whatsapp: Joi.number().allow(''),
    }

    componentDidMount() {
        this.props.fetch()
        const {links} = this.props
        if (Object.keys(links).length > 0) {
            this.fillState()
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.links !== this.props.links) {
            this.fillState()
        }
    }

    fillState = () => {
        const {instagram, youtube, facebook, email, whatsapp} = this.props.links
        const data = {...this.state.data}
        data.instagram = instagram
        data.youtube = youtube
        data.facebook = facebook
        data.email = email
        data.whatsapp = whatsapp
        this.setState({ data })
    }

    doSubmit = () => {
        const payload = {}
        const {data} = this.state
        const {links} = this.props
        
        Object.keys(data).forEach(key => {
            if (data[key] !== links[key])
                payload[key] = data[key]
        })

        if (Object.keys(payload).length > 0)
            this.props.update(payload)
    }

    render() { 
        return ( 
            <React.Fragment>
                <h1 className="text-center underlined-heading">Call To Action Links</h1>
                <div className="p-2 mt-5">
                    {this.renderInput('instagram', 'Instagram', 'url')}
                    {this.renderInput('youtube', 'Youtube', 'url')}
                    {this.renderInput('facebook', 'Facebook', 'url')}
                    {this.renderInput('email', 'Email', 'email')}
                    {this.renderInput('whatsapp', 'Whatsapp', 'number')}
                    
                    <p className="mt-2" style={{fontSize: '16px', color: 'rgb(142 135 46)', marginBottom: '-2em'}}>
                        Please prepend URLs with 
                        <span style={{borderRadius: '5px', backgroundColor: 'rgb(142 135 46)', color: '#21250A', padding: '0 5px', margin: '0 2px'}}>
                            https://www
                        </span>
                        <br />
                        Please prepend mobile number with
                        <span style={{borderRadius: '5px', backgroundColor: 'rgb(142 135 46)', color: '#21250A', padding: '0 5px', margin: '0 2px'}}>
                            +91
                        </span>
                    </p>

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
    links: getCTALinks(state),
    errors: getCTAErrors(state)
})
 
const mapDispatchToProps = dispatch => ({
    fetch: () => dispatch(fetchCTA()),
    update: CTA => dispatch(updateCTA(CTA)),
    clearErrors: () => dispatch(ctaClearErrors())
})

export default connect(mapStateToProps, mapDispatchToProps)(CTAForm)