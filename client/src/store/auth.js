import { createSelector, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import { apiEndpoint } from './../config.json'
import { apiCallBegan } from './api'

const slice = createSlice({
    name: 'auth',
    initialState: {
        admin: {},
        loading: true,
        errors: null
    },
    reducers: {
        adminFetched: (state, action) => {
            state.admin = action.payload
            state.loading = false
        },
        adminUpdated: (state, action) => {
            state.admin = action.payload
            state.loading = false
            toast.success('Profile Updated')
        },
        adminRequested: (state, action) => {
            state.loading = true
        },
        adminRequestFailed: (state, action) => {
            state.loading = false
            state.errors = action.payload
        },
        adminClearErrors: (state, action) => {
            state.errors = null
        }
    }
})

export const { adminFetched, adminUpdated, adminRequested, adminRequestFailed, adminClearErrors } = slice.actions

export default slice.reducer

export const fetchAdminProfile = () => (dispatch, getState) => {
    const profile = getState().auth.admin
    
    if (Object.keys(profile).length === 0) {
        dispatch(apiCallBegan({
            url: apiEndpoint + '/admin/profile',
            method: 'get',
            onStart: adminRequested.type,
            onSuccess: adminFetched.type,
            onError: adminRequestFailed.type
        }))
    }
}

export const updateAdminProfile = admin => apiCallBegan({
    url: apiEndpoint + '/admin/profile',
    method: 'patch',
    data: admin,
    onStart: adminRequested.type,
    onSuccess: adminUpdated.type,
    onError: adminRequestFailed.type
})

export const getAdminProfile = createSelector(
    state => state.auth,
    (auth) => auth.admin
)

export const getAdminErrors = createSelector(
    state => state.auth,
    (auth) => auth.errors
)