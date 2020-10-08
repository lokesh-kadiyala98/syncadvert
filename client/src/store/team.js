import { createSelector, createSlice } from '@reduxjs/toolkit';
import {toast} from 'react-toastify'

import {apiEndpoint} from './../config.json'
import {apiCallBegan} from './api';

const slice = createSlice({
    name: 'team',
    initialState: {
        list: [],
        loading: false,
        errors: null,
    },
    reducers: {
        membersFetched: (state, action) => {
            state.list = action.payload
            state.loading = false
        },
        memberAdded: (state, action) => {
            state.list.push(action.payload)
            state.loading = false
            toast(action.payload.name + ' Added to Team')
        },
        memberDeleted: (state, action) => {
            const {_id} = action.payload
            const list = state.list.filter(e => e._id !== _id)
            state.list = list
            toast(action.payload.name + ' Deleted from Team')
        },
        memberUpdated: (state, action) => {
            const {_id} = action.payload
            const index = state.list.findIndex(e => e._id === _id)
            if (index !== -1)
                state.list[index] = action.payload
                
            toast(action.payload.name + ' Updated')
        },
        memberRequested: (state, action) => {
            state.loading = true
        },
        memberRequestFailed: (state, action) => {
            state.loading = false
            state.errors = action.payload
        },
        clearErrors: (state, action) => {
            state.errors = null
        }
    }
})

export const { membersFetched, memberAdded, memberUpdated, memberDeleted, memberRequested, memberRequestFailed, clearErrors } = slice.actions

export default slice.reducer

export const fetchTeamMembers = () => (dispatch, getState) => {
    const {list} = getState().entities.team
    
    if (list.length === 0)
        dispatch(apiCallBegan({
            url: apiEndpoint + '/admin/activities/team',
            method: 'get',
            onStart: memberRequested.type,
            onSuccess: membersFetched.type,
            onError: memberRequestFailed.type
        }))
}

export const addMember = (data) => (dispatch, getState) => {
    dispatch(apiCallBegan({
        url: apiEndpoint + '/admin/activities/team',
        method: 'post',
        data: data,
        onSuccess: memberAdded.type,
        onError: memberRequestFailed.type
    }))
}

export const updateMember = (_id, data) => (dispatch, getState) => {
    dispatch(apiCallBegan({
        url: apiEndpoint + '/admin/activities/team/' + _id,
        method: 'patch',
        data: data,
        onSuccess: memberUpdated.type,
        onError: memberRequestFailed.type
    }))
}

export const deleteMember = (_id) => (dispatch, getState) => {
    dispatch(apiCallBegan({
        url: apiEndpoint + '/admin/activities/team/' + _id,
        method: 'delete',
        onSuccess: memberDeleted.type,
        onError: memberRequestFailed.type
    }))
}

export const getTeam = createSelector(
    state => state.entities.team,
    (team) => team
)