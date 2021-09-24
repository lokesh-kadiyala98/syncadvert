import React from 'react';
import Joi from 'joi-browser'
import { connect } from 'react-redux';
import RichTextEditor from 'react-rte';
import _ from 'lodash';
import axios from 'axios'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'

import Form from './../../Form/form';
import UploadImage from './../../Form/uploadImage';

import { addBlog, getBlogs, editBlog } from './../../../store/blogs';

import {apiEndpoint} from '../../../config.json';

class CreateBlog extends Form {
    state = { 
        data: {
            title: 'Test',
            headerImg: 'blog/c017cf70-1bb1-11ec-95b4-0b85eff472db.png',
            subTitle: 'testing',
            body: '',
            published: false
        },
        editorValue: RichTextEditor.createEmptyValue(),
        localAPIResponseData: {
            _id: null,
            savingInBackground: false
        },
        errors: {}
    }

    schema = {
        headerImg: Joi.string(),
        title: Joi.string(),
        subTitle: Joi.string().allow(''),
        body: Joi.string(),
        published: Joi.boolean()
    }

    doSubmit = () => {
        const {
            data, 
            localAPIResponseData: {
                _id
            }
        } = this.state

        if (!_id)
            this.props.add(data)
        else 
            this.props.update(_id, data)
    }

    handleHeaderImageUploadSuccess = (img) => {
        const data = {...this.state.data}
        data.headerImg = img 
        this.setState({ data })
    }

    handleImageUploadRevert = () => {
        const data = {...this.state.data}
        data.headerImg = '' 
        this.setState({ data })
    }

    saveData = async (e, data = this.state.data) => {
        const localAPIResponseData = {...this.state.localAPIResponseData}

        const makeApiCall = async () => {
            if (!localAPIResponseData._id) {
                try {
                    const { 
                        data: {
                            _id
                        }, 
                        status
                    } = await axios.post(apiEndpoint + '/admin/activities/blogs', {...data})
    
                    localAPIResponseData._id = _id
                    
                    if (status === 201)
                        this.setState({ localAPIResponseData })
                } catch (err) {}
            } else {
                this.props.update(localAPIResponseData._id, data, false)
            }
    
            localAPIResponseData.savingInBackground = false
            this.setState({ localAPIResponseData })
        }

        localAPIResponseData.savingInBackground = true
        this.setState({ localAPIResponseData }, () => {
            setTimeout(makeApiCall, 1000)
        })
    }

    saveBlogDebouncer = _.debounce(() => {
        const results = Joi.validate(this.state.data, this.schema, { abortEarly: false });

        if(!results.error) {
            this.saveData()
        }
    }, 3000)

    onEditorValueChange = (value) => {
        let editorValue = {...this.state.editorValue}
        let data = {...this.state.data}
        
        this.saveBlogDebouncer()
        
        editorValue = value
        data.body = value.toString('html')

        this.setState({ editorValue, data })
    }

    onPublishValueChange = (published) => {
        const {data} = this.state
        this.setState({ data: {...data, published} })
    }

    render() { 
        const {loading} = this.props.blogs
        const {
            data: {
                published
            },
            localAPIResponseData: {
                savingInBackground,
                _id
            }
        } = this.state

        const results = Joi.validate(this.state.data, this.schema, { abortEarly: false });
        const noErrors = !results.error

        return ( 
            <React.Fragment>
                <div className="p-2 mt-5 container new-blog-container"> 
                    <div className="mb-3 flex-end">
                        {noErrors &&
                            <BootstrapSwitchButton
                                onstyle="outline-success" 
                                offstyle="outline-danger"
                                checked={!published}
                                onlabel='Publish'
                                offlabel='Unpublish'
                                onChange={() => {
                                    this.onPublishValueChange(!published)
                                }}
                                width={120}
                            />
                        }
                    </div>

                    <div className="mb-5">
                        {this.renderInput('title', 'Title', 'text')}
                    </div>
                    
                    <div className="mb-5">
                        <UploadImage
                            allowMultiple={false}
                            labelIdle='Drop image or <span class="filepond--label-action">Browse</span>'
                            aspectRatio='16:9'
                            nameSpace='blog'
                            onSuccess={this.handleHeaderImageUploadSuccess}
                            onRevert={this.handleImageUploadRevert}
                        />
                    </div>
                    
                    <div className="mb-5">
                        {this.renderInput('subTitle', 'Sub Title', 'text')}
                    </div>

                    {savingInBackground ?
                        <button className="btn btn-sm float-right blog-save-btn" disabled>
                            <span className="mr-2">
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            </span>
                            Saving
                        </button> :
                        <button className="btn btn-sm float-right blog-save-btn" onClick={this.saveData}>
                            <span className="mr-2">
                                <i className="fas fa-save"></i>
                            </span>
                            Save
                        </button>
                    }


                    <div className="mb-5 text-dark">
                        <RichTextEditor
                            value={this.state.editorValue}
                            onChange={this.onEditorValueChange}
                        />
                    </div>

                    <div className="btn-grp">
                        {loading ?
                            this.renderLoadingButton(' Loading') :
                            _id ?
                                this.renderButton('Save Blog', 'btn-submit') :
                                this.renderButton('Add Blog', 'btn-submit')
                        }
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    blogs: getBlogs(state)
})

const mapDispatchToProps = dispatch => ({
    add: data => dispatch(addBlog(data)),
    update: (id, blog, toast) => dispatch(editBlog(id, blog, toast))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateBlog)