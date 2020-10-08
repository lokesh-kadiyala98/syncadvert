import { createSelector, createSlice } from '@reduxjs/toolkit';
import {toast} from 'react-toastify'

import {apiEndpoint} from '../config.json'
import {apiCallBegan} from './api';

const slice = createSlice({
    name: 'blogs',
    initialState: {
        list: [],
        loading: false,
        errors: null
    },
    reducers: {
        blogsFetched: (state, action) => {
            state.list = action.payload
            state.loading = false
        },
        blogFetched: (state, action) => {
            const {_id} = action.payload
            const index = state.list.findIndex(e => e._id === _id)
            if (index !== -1)
                state.list[index] = action.payload
            console.log(index, action.payload)
        },
        blogAdded: (state, action) => {
            state.list = [action.payload, ...state.list]
            state.loading = false
            toast('Blog Added')
        },
        blogDeleted: (state, action) => {
            const {_id} = action.payload
            const list = state.list.filter(e => e._id !== _id)
            state.list = list
            toast('Blog Deleted')
        },
        blogUpdated: (state, action) => {
            const {_id} = action.payload
            const index = state.list.findIndex(e => e._id === _id)
            if (index !== -1)
                state.list[index] = action.payload
                
            toast('Blog Updated')
        },
        blogsRequested: (state, action) => {
            state.loading = true
        },
        blogsRequestFailed: (state, action) => {
            state.loading = false
            state.errors = action.payload
        },
        blogsClearErrors: (state, action) => {
            state.errors = null
        }
    }
})

export const { blogsFetched, blogFetched, blogAdded, blogUpdated, blogDeleted, blogsRequested, blogsRequestFailed, blogsClearErrors } = slice.actions

export default slice.reducer

export const fetchBlogs = () => (dispatch, getState) => {
    const {list} = getState().entities.blogs
    
    if (list.length === 0)
        dispatch(apiCallBegan({
            url: apiEndpoint + '/admin/activities/blogs',
            method: 'get',
            onStart: blogsRequested.type,
            onSuccess: blogsFetched.type,
            onError: blogsRequestFailed.type
        }))
}

export const fetchBlog = blogId => (dispatch, getState) => {
    dispatch(apiCallBegan({
        url: apiEndpoint + '/admin/activities/blogs/' + blogId,
        method: 'get',
        onStart: blogsRequested.type,
        onSuccess: blogFetched.type,
        onError: blogsRequestFailed.type
    }))
}

export const addBlog = data => (dispatch, getState) => {
    dispatch(apiCallBegan({
        url: apiEndpoint + '/admin/activities/blogs',
        method: 'post',
        data: data,
        onStart: blogsRequested.type,
        onSuccess: blogAdded.type,
        onError: blogsRequestFailed.type
    }))
}

export const deleteBlog = _id => (dispatch, getState) => {
    dispatch(apiCallBegan({
        url: apiEndpoint + '/admin/activities/blogs/' + _id,
        method: 'delete',
        onSuccess: blogDeleted.type,
        onError: blogsRequestFailed.type
    }))
}

export const editBlog = (id, blog) => (dispatch, getState) => {
    dispatch(apiCallBegan({
        url: apiEndpoint + '/admin/activities/blogs/' + id,
        method: 'patch',
        data: blog,
        onSuccess: blogUpdated.type,
        onError: blogsRequestFailed.type
    }))
}

export const getBlogs = createSelector(
    state => state.entities.blogs,
    (blogs) => blogs
)

export const getBlog = blogId => createSelector(
    state => state.entities.blogs,
    blogs => blogs.list.filter(blog => blog._id === blogId)
)