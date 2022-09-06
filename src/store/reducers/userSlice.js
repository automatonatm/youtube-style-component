import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    loading: false,
    error: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginStart: state => {
            state.loading = true
        },

        loginSuccess: (state, action) => {
            state.loading = false
            state.user = action.payload
        },

        loginFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },

        logout: (state) => {
            return initialState
        },



    },
})


// Action creators are generated for each case reducer function
export const { loginStart, loginSuccess, loginFailure, logout } = userSlice.actions


export default userSlice.reducer