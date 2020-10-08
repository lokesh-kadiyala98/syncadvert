import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
    name: 'ui',
    initialState: {
        sortKey: 'createdAt',
        sortOrder: 'asc'
    },
    reducers: {
        uiChanged: (state, action) => {
            state.sortKey = action.payload.sortKey
            state.sortOrder = action.payload.sortOrder
        }
    }
})

export const { uiChanged } = slice.actions

export default slice.reducer

export const changeUi = sortKey => (dispatch, getState) => {
    const ui = {...getState().ui}
    ui.sortOrder = ui.sortOrder === 'asc' ? 'desc' : 'asc'
    ui.sortKey = sortKey

    dispatch(uiChanged(ui))
}