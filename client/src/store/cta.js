import { createSlice, createSelector } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';

import { apiEndpoint } from './../config.json'
import { apiCallBegan } from './api';

const slice = createSlice({
    name: 'CTA',
    initialState: {
        links: {},
        loading: false,
        errors: null
    },
    reducers: {
        ctaFetched: (state, action) => {
            state.links = action.payload[0]
            state.loading = false
        },
        ctaUpdated: (state, action) => {
            state.links = action.payload
            state.loading = false
            toast.success('CTA Updated')
        },
        ctaRequested: (state, action) => {
            state.loading = true
        },
        ctaRequestFailed: (state, action) => {
            state.loading = false
            state.errors = action.payload
            toast.error(action.payload)
        },
        ctaClearErrors: (state, action) => {
            state.errors = null
        }
    }
})

export const { ctaFetched, ctaUpdated, ctaRequested, ctaRequestFailed, ctaClearErrors } = slice.actions

export default slice.reducer

export const fetchCTA = () => (dispatch, getState) => {
    const CTA = getState().entities.CTA.links
    
    if (Object.keys(CTA).length === 0) {
        dispatch(apiCallBegan({
            url: '/ui/cta',
            method: 'get',
            onStart: ctaRequested.type,
            onSuccess: ctaFetched.type,
            onError: ctaRequestFailed.type 
        }))
    }
}

export const updateCTA = CTA => apiCallBegan({
    url: apiEndpoint + '/admin/activities/cta',
    method: 'patch',
    data: CTA,
    onStart: ctaRequested.type,
    onSuccess: ctaUpdated.type,
    onError: ctaRequestFailed.type
})

export const getCTA = createSelector(
    state => state.entities.CTA,
    (CTA) => CTA
)

export const getCTALinks = createSelector(
    state => state.entities.CTA,
    (CTA) => CTA.links
)

export const getCTAErrors = createSelector(
    state => state.entities.CTA,
    (CTA) => CTA.errors
)