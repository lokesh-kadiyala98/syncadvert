import React from 'react';
import { connect } from 'react-redux'
import {toast} from 'react-toastify'
import Joi from 'joi-browser'

import Form from '../Form/form';
import { addCategory, getCategoryErrors, categoryClearErrors, deleteCategory } from './../../store/categories';

class CategoryForm extends Form {
    state = { 
        data: {
            name: ''
        },
        errors: {}
    }

    schema = {
        name: Joi.string().label('Category').min(4).max(30).required()
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.errors !== prevProps.errors) {
            let errors = {...this.state.errors}
            errors = {'name': this.props.errors}
            this.setState({ errors })
        }
    }

    doSubmit = () => {
        this.props.clearErrors()
        const {data} = this.state
        data.name = data.name.toLowerCase()
            .split(' ')
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ')

        this.props.add(data)
    }

    handleDeleteCategory = id => {
        if (id === '5f74969346758f507c23c6d7')
            return toast.error('Category Random cannot be DELETED.')
        this.props.delete(id)
    }

    render() { 
        const {categories} = this.props
        return ( 
            <div className="container pt-5">
                <h3 className="text-center underlined-heading">Add Category</h3>

                {this.renderInput('name', 'Category')}

                <div className="btn-grp">
                    {this.renderCancelButton('Close', 'btn-cancel')}
                    {this.state.loading ?
                        this.renderLoadingButton(' Loading') :
                        this.renderButton('Add', 'btn-login')
                    }
                </div>
                
                <div className="delete-categories">
                    {Object.keys(categories).length > 0 && Object.keys(categories).map(id =>
                        <button onClick={() => this.handleDeleteCategory(id)} className="btn btn-outline-danger" key={id}>
                            {categories[id].name}
                        </button>
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    errors: getCategoryErrors(state)
})

const mapDispatchToProps = dispatch => ({
    add: category => dispatch(addCategory(category)),
    delete: id => dispatch(deleteCategory(id)),
    clearErrors: () => dispatch(categoryClearErrors())
})
 
export default connect(mapStateToProps, mapDispatchToProps)(CategoryForm)