import { createSelector, createSlice } from '@reduxjs/toolkit';
import {toast} from 'react-toastify'

import {apiEndpoint} from '../config.json'
import {apiCallBegan} from './api';

const slice = createSlice({
    name: 'testimonials',
    initialState: {
        list: [],
        loading: false,
        errors: null
    },
    reducers: {
        testimonialsFetched: (state, action) => {
            state.list = action.payload
            state.loading = false
        },
        testimonialAdded: (state, action) => {
            state.list = [action.payload, ...state.list]
            state.loading = false
            toast('Testimonial Added')
        },
        testimonialDeleted: (state, action) => {
            const {_id} = action.payload
            const list = state.list.filter(e => e._id !== _id)
            state.list = list
            toast('Testimonial Deleted')
        },
        testimonialUpdated: (state, action) => {
            const {_id} = action.payload
            const index = state.list.findIndex(e => e._id === _id)
            if (index !== -1)
                state.list[index] = action.payload
                
            toast('Testimonial Updated')
        },
        testimonialsRequested: (state, action) => {
            state.loading = true
        },
        testimonialsRequestFailed: (state, action) => {
            state.loading = false
            state.errors = action.payload
        },
        testimonialsClearErrors: (state, action) => {
            state.errors = null
        }
    }
})

export const { testimonialsFetched, testimonialAdded, testimonialUpdated, testimonialDeleted, testimonialsRequested, testimonialsRequestFailed, testimonialsClearErrors } = slice.actions

export default slice.reducer

export const fetchTestimonials = () => (dispatch, getState) => {
    const {list} = getState().entities.testimonials
    
    if (list.length === 0)
        dispatch(apiCallBegan({
            url: apiEndpoint + '/admin/activities/testimonials',
            method: 'get',
            onStart: testimonialsRequested.type,
            onSuccess: testimonialsFetched.type,
            onError: testimonialsRequestFailed.type
        }))
}

export const addTestimonial = (data) => (dispatch, getState) => {
    dispatch(apiCallBegan({
        url: apiEndpoint + '/admin/activities/testimonials',
        method: 'post',
        data: data,
        onSuccess: testimonialAdded.type,
        onError: testimonialsRequestFailed.type
    }))
}

export const deleteTestimonial = (_id) => (dispatch, getState) => {
    dispatch(apiCallBegan({
        url: apiEndpoint + '/admin/activities/testimonials/' + _id,
        method: 'delete',
        onSuccess: testimonialDeleted.type,
        onError: testimonialsRequestFailed.type
    }))
}

export const getTestimonials = createSelector(
    state => state.entities.testimonials,
    (testimonials) => testimonials.list
)

export const getTestimonialErrors = createSelector(
    state => state.entities.testimonials,
    (testimonials) => testimonials.errors
)