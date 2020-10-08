import React from 'react';
import axios from 'axios'
import Joi from 'joi-browser'
import { connect } from 'react-redux'
import RichTextEditor from 'react-rte'
import { Link } from 'react-router-dom'
import htmlReactParser from 'html-react-parser'

import NotFound from './../../admin/NotFound'
import Form from './../../Form/form'
import Loader from './../../Loader'
import { fetchBlog, deleteBlog, editBlog } from './../../../store/blogs'

import { s3BucketName } from './../../../config.json'
import './style.css'

class EditBlog extends Form {
    state = { 
        data: {
            title: '',
            headerImg: '',
            subTitle: '',
        },
        editorValue: {},
        errors: {},
        loading: true,
        notFound: false,
        edit: false
    }

    schema = {
        headerImg: Joi.string(),
        title: Joi.string(),
        subTitle: Joi.string().allow(''),
        body: Joi.string()
    }
    
    async componentDidMount() {
        const {blogId} = this.props
        try {
            const {data} = await axios.get('/admin/activities/blogs/' + blogId)
            
            delete data._id
            delete data.__v

            this.setState({ data, editorValue: RichTextEditor.createValueFromString(data.body, 'html') })
        } catch (e) {
            if (e.response.status)
                this.setState({ notFound: true })
        }
        this.setState({ loading: false })
    } 

    handleHeaderImageUploadSuccess = (img) => {
        const data = {...this.state.data}
        data.headerImg = img 
        this.setState({ data })
    }

    onEditorValueChange = (value) => {
        let editorValue = {...this.state.editorValue}
        let data = {...this.state.data}
        
        editorValue = value
        data.body = value.toString('html')

        this.setState({ editorValue, data })
    }

    onDeleteBlog = () => {
        const {blogId} = this.props
        if (window.confirm('Do you really want to DELETE this blog?'))
            this.props.delete(blogId)
    }

    doSubmit = async () => {
        const {blogId} = this.props
        const {data} = this.state

        this.props.update(blogId, data)
        this.setState({ edit: false })
    }
    
    render() { 
        const {loading, data, edit, notFound} = this.state
        const {headerImg, title, subTitle, body} = data

        if (notFound)
            return <NotFound />

        return ( 
            <div>
                {loading ?
                    <Loader /> :
                    <div className="blog-container">
                        <div className="blog-content">
                                
                            <div className="blog-header mb-5">
                                <Link className="btn btn-light text-dark" to="/adminBlog"><i className="fas fa-arrow-left mr-2"></i> Blogs</Link>
                                <div className="blog-options">
                                    <button className="btn text-light btn-warning mr-3" onClick={() => this.setState({ edit: true })}>
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button className="btn text-light btn-danger" onClick={this.onDeleteBlog}>
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>

                            {edit ?
                                this.renderInput('title', 'Title', 'text') :
                                <h1 className="mb-3">{title}</h1>
                            }

                            <img src={s3BucketName + headerImg} alt="blog content" />
                                
                            {edit ?
                                this.renderInput('subTitle', 'Sub Title', 'text') :
                                <p className="text-muted text-center mt-3 mb-5">{subTitle}</p>
                            }

                            {edit ?
                                <div className="mt-3 text-dark">
                                    <RichTextEditor
                                        value={this.state.editorValue}
                                        onChange={this.onEditorValueChange}
                                    />
                                </div> :
                                <div className="body">
                                    {body && htmlReactParser(body)}
                                </div>
                            }

                            {edit ?
                                <div className="btn-grp">
                                    {loading ?
                                        this.renderLoadingButton(' Loading') :
                                        this.renderButton('Update Blog', 'btn-submit')
                                    }
                                </div> :
                                null
                            }

                        </div>
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
    fetch: id => dispatch(fetchBlog(id)),
    update: (id, blog) => dispatch(editBlog(id, blog)),
    delete: id => dispatch(deleteBlog(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditBlog);