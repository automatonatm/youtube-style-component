import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    channel: null,
    loading: false,
    error: null
}

export const channelSlice = createSlice({
    name: 'channel',
    initialState,
    reducers: {
        fetchStart: state => {
            state.loading = true
        },

        fetchSuccess: (state, action) => {
            state.loading = false
            state.channel = action.payload
        },

        fetchFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },

        defaultState: (state) => {
            return initialState
        },



    },
})


// Action creators are generated for each case reducer function
export const { fetchStart, fetchSuccess, fetchFailure, defaultState } = channelSlice.actions

export default channelSlice.reducer