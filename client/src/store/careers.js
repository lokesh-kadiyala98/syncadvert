import { createSlice, createSelector } from '@reduxjs/toolkit';
import {toast} from 'react-toastify'

import { apiCallBegan } from './api';
import { apiEndpoint } from './../config.json'

const slice = createSlice({
    name: 'careers',
    initialState: {
        list: [],
        errors: '',
        loading: false
    },
    reducers: {
        careerAdded: (state, action) => {
            const {role} = action.payload
            toast(`New '${role}' Added`)
            state.list.push(action.payload)
        },
        careersRequested: (state, action) => {
            state.loading = true
        },
        careersReceived: (state, action) => {
            state.list = action.payload
            state.errors = ''
            state.loading = false
        },
        careersRequestFailed: (state, action) => {
            state.errors = action.payload
            state.loading = false
        },
        careersClearErrors: (state, action) => {
            state.errors = ''
        },
        careerDeleted: (state, action) => {
            const {role, _id} = action.payload
            const list = state.list.filter(e => e._id !== _id)
            state.list = list
            toast(`${role} DELETED.`)
        }
    }
})

export const { careerAdded, careersRequested, careersRequestFailed, careersReceived, careersClearErrors, careerDeleted } = slice.actions

export default slice.reducer

export const fetchCareers = () => (dispatch, getState) => {
    const careers = getState().entities.careers.list
    
    if (careers.length === 0)
        dispatch(apiCallBegan({
            url: apiEndpoint + '/admin/activities/careers',
            method: 'get',
            onStart: careersRequested.type,
            onSuccess: careersReceived.type,
            onError: careersRequestFailed.type
        }))
}

export const addCareer = career => (dispatch, getState) => {
    dispatch(apiCallBegan({
        url: apiEndpoint + '/admin/activities/careers',
        method: 'post',
        data: career,
        onSuccess: careerAdded.type,
        onError: careersRequestFailed.type
    }))
}

export const deleteCareer = (id) => (dispatch, getState) => {
    dispatch(apiCallBegan({
        url: apiEndpoint + '/admin/activities/careers/' + id,
        method: 'delete',
        onSuccess: careerDeleted.type,
        onError: careersRequestFailed.type
    }))
}

export const getCareers = createSelector(
    state => state.entities.careers,
    (careers) => careers
)