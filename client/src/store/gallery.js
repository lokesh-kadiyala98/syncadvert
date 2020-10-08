import { createSlice, createSelector } from '@reduxjs/toolkit';
import {toast} from 'react-toastify'
import _ from 'lodash'

import { apiCallBegan } from './api';
import { apiEndpoint } from './../config.json'

const slice = createSlice({
    name: 'gallery',
    initialState: {
        list: [],
        loading: false,
        pagination: {
            category: '',
            page: 0,
            perPage: 30,
            allCaughtUp: false
        }
    },
    reducers: {
        imageAdded: (state, action) => {
            toast('Image Added')
            state.list = [action.payload, ...state.list]
        },
        imageAppearanceChanged: (state, action) => {
            toast('Image Updated')
            const { _id } = action.payload
            const index = state.list.findIndex(img => img._id === _id)
            state.list[index] = action.payload
        },
        imageDeleted: (state, action) => {
            toast('Image Deleted')
            const { _id } = action.payload
            const updatedState = state.list.filter(img => img._id !== _id)
            state.list = updatedState
        },
        imagesRequested: (state, action) => {
            state.loading = true
            state.pagination.page += 1
        },
        imagesReceived: (state, action) => {
            state.list = [...state.list, ...action.payload]
            state.loading = false

            if (action.payload.length < state.pagination.perPage)
                state.pagination.allCaughtUp = true
        },
        imagesRequestFailed: (state, action) => {
            state.loading = false
            toast.error(action.payload)
        },
        imagesResetState: (state, action) => {
            state.pagination.category = action.payload
            state.pagination.page = 0
            state.pagination.allCaughtUp = false
            state.list = []
        }
    }
})

export const { imageAdded, imageAppearanceChanged, imageDeleted, imagesRequested, imagesRequestFailed, imagesReceived, imagesResetState } = slice.actions

export default slice.reducer

export const fetchImages = (category) => (dispatch, getState) => {
    const {loading, pagination} = getState().entities.gallery
    const {category: prevCategory} = pagination
    
    //If current category is different from previous one reset the state
    if (category !== prevCategory) {
        dispatch({
            type: imagesResetState.type,
            payload: category
        })
    }

    const {page, perPage, allCaughtUp} = getState().entities.gallery.pagination
    const options = {page, perPage, category}

    //Do not fire the request if the previous request is not yet resolved 
    if (!loading && !allCaughtUp) {
        dispatch(apiCallBegan({
            url: apiEndpoint + '/admin/activities/images',
            method: 'get',
            data: options,
            onStart: imagesRequested.type,
            onSuccess: imagesReceived.type,
            onError: imagesRequestFailed.type
        }))
    }
}

export const addImage = path => (dispatch, getState) => {
    dispatch(apiCallBegan({
        url: apiEndpoint + '/admin/activities/images',
        method: 'post',
        data: path,
        onSuccess: imageAdded.type
    }))
}

export const editImage = (id, data) => (dispatch, getState) => {
    dispatch(apiCallBegan({
        url: apiEndpoint + '/admin/activities/images/' + id,
        method: 'patch',
        data: data,
        onSuccess: imageAppearanceChanged.type
    }))
}

export const deleteImage = path => (dispatch, getState) => {
    dispatch(apiCallBegan({
        url: apiEndpoint + '/admin/activities/images',
        method: 'delete',
        data: path,
        onSuccess: imageDeleted.type,
        onError: imagesRequestFailed.type
    }))
}

export const getImages = createSelector(
    state => state.entities.gallery,
    // state => state.ui,
    // (gallery, ui) => ({...gallery, list: _.orderBy(gallery.list, [ui.sortKey], [ui.sortOrder])})
    gallery => gallery
)

export const getGallerySorted = createSelector(
    state => state.entities.gallery.list,
    state => state.ui,
    (list, ui) => _.orderBy(list, [ui.sortKey], [ui.sortOrder])
)