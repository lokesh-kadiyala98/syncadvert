import { createSlice, createSelector } from '@reduxjs/toolkit';
import {toast} from 'react-toastify'

import { apiCallBegan } from './api';
import { apiEndpoint } from './../config.json'

const slice = createSlice({
    name: 'categories',
    initialState: {
        list: {},
        errors: '',
        loading: false
    },
    reducers: {
        categoryAdded: (state, action) => {
            toast(`New Category '${action.payload.name}' Added`)
            const c = action.payload
            state.list[c._id] = c
        },
        categoryRequested: (state, action) => {
            state.loading = true
        },
        categoryReceived: (state, action) => {
            action.payload.forEach(c => {
                state.list[c._id] =  c
            })
            state.errors = ''
            state.loading = false
        },
        categoryRequestFailed: (state, action) => {
            state.errors = action.payload
            state.loading = false
        },
        categoryClearErrors: (state, action) => {
            state.errors = ''
        },
        categoryUpdated: (state, action) => {
            const { _id, name, pinImg } = action.payload
            if (pinImg)
                toast(`Image Pinned to ${name} Category`)
            else
                toast(`Image Unpinned from ${name} Category`)
            state.list[_id] = action.payload
        },
        categoryDeleted: (state, action) => {
            const {name} = action.payload
            toast(`${name} DELETED. Refresh the page to see changes.`)
        }
    }
})

export const { categoryAdded, categoryRequested, categoryRequestFailed, categoryReceived, categoryClearErrors, categoryUpdated, categoryDeleted } = slice.actions

export default slice.reducer

export const fetchCategories = () => (dispatch, getState) => {
    const categories = getState().entities.categories.list
    
    if (Object.keys(categories).length === 0)
        dispatch(apiCallBegan({
            url: apiEndpoint + '/admin/activities/categories',
            method: 'get',
            onStart: categoryRequested.type,
            onSuccess: categoryReceived.type,
            onError: categoryRequestFailed.type
        }))
}

export const addCategory = category => (dispatch, getState) => {
    dispatch(apiCallBegan({
        url: apiEndpoint + '/admin/activities/categories',
        method: 'post',
        data: category,
        onSuccess: categoryAdded.type,
        onError: categoryRequestFailed.type
    }))
}

export const editCategory = (id, data) => (dispatch, getState) => {
    dispatch(apiCallBegan({
        url: apiEndpoint + '/admin/activities/categories/' + id,
        method: 'patch',
        data: data,
        onSuccess: categoryUpdated.type,
        onError: categoryRequestFailed.type
    }))
}

export const deleteCategory = (id) => (dispatch, getState) => {
    dispatch(apiCallBegan({
        url: apiEndpoint + '/admin/activities/categories/' + id,
        method: 'delete',
        onSuccess: categoryDeleted.type,
        onError: categoryRequestFailed.type
    }))
}

export const getCategories = createSelector(
    state => state.entities.categories,
    (categories) => categories.list
)

export const getCategoryErrors = createSelector(
    state => state.entities.categories,
    (categories) => categories.errors
)