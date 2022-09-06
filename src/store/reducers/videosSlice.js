import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

import api from "util/axios";

export const getVideos =  createAsyncThunk("videos/all",
    async ({type}, {rejectWithValue}) => {


    try {
        const { data: data } = await api.get(`/videos/${type}/videos`);
        return data

    }catch (err) {
        return rejectWithValue(err.response && err.response.data.message
            ? err.response.data.message
            : err.message);
    }


});





const initialState = {
    videos: null,
    loading: false,
    error: null
}



export const videosSlice = createSlice({
    name: 'videos',
    initialState,
    reducers: {
       /*fetchStart: state => {
            state.loading = true
        },

        fetchSuccess: (state, action) => {
            state.loading = false
            state.videos = action.payload
        },

        fetchFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },*/
        defaultState: (state) => {
            return initialState
        },

    },
    extraReducers: {
        [getVideos.pending]: (state) => {
            state.loading = true;
            state.error = null
        },
        [getVideos.fulfilled]: (state, action) => {
            state.videos = action.payload;
            state.loading = false;
        },
        [getVideos.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
})


// Action creators are generated for each case reducer function
export const { defaultState } = videosSlice.actions


export default videosSlice.reducer