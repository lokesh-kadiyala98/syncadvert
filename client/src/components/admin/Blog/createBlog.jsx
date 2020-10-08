import React from 'react';
import Joi from 'joi-browser'
import { connect } from 'react-redux';
import RichTextEditor from 'react-rte';

import Form from './../../Form/form';
import UploadImage from './../../Form/uploadImage';

import { addBlog, getBlogs } from './../../../store/blogs';

class CreateBlog extends Form {
    state = { 
        data: {
            title: '',
            headerImg: '',
            subTitle: '',
        },
        editorValue: RichTextEditor.createEmptyValue(),
        errors: {}
    }

    schema = {
        headerImg: Joi.string(),
        title: Joi.string(),
        subTitle: Joi.string().allow(''),
        body: Joi.string()
    }

    doSubmit = () => {
        const {data} = this.state
        this.props.add(data)
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

    onEditorValueChange = (value) => {
        let editorValue = {...this.state.editorValue}
        let data = {...this.state.data}
        
        editorValue = value
        data.body = value.toString('html')

        this.setState({ editorValue, data })
    }

    render() { 
        const {loading} = this.props.blogs

        return ( 
            <React.Fragment>
                <div className="p-2 mt-5 container"> 

                    {this.renderInput('title', 'Title', 'text')}
                    
                    <UploadImage
                        allowMultiple={false}
                        labelIdle='Drop image or <span class="filepond--label-action">Browse</span>'
                        aspectRatio='16:9'
                        nameSpace='blog'
                        onSuccess={this.handleHeaderImageUploadSuccess}
                        onRevert={this.handleImageUploadRevert}
                    />
                    
                    {this.renderInput('subTitle', 'Sub Title', 'text')}

                    <div className="mt-3 text-dark">
                        <RichTextEditor
                            value={this.state.editorValue}
                            onChange={this.onEditorValueChange}
                        />
                    </div>

                    <div className="btn-grp">
                        {loading ?
                            this.renderLoadingButton(' Loading') :
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
    add: data => dispatch(addBlog(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateBlog)