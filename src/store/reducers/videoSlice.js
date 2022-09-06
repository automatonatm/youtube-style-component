import { createSlice} from '@reduxjs/toolkit'



const initialState = {
    video: null,
    loading: false,
    error: null
}



export const videoSlice = createSlice({
    name: 'video',
    initialState,
    reducers: {
        fetchStart: state => {
            state.loading = true
        },
        fetchSuccess: (state, action) => {



            state.loading = false
            state.video = action.payload


        },
        fetchFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },

        like: (state, action) => {
            if (!state.video.likes.includes(action.payload)) {
                state.video.likes.push(action.payload);
                state.video.dislikes.splice(state.video.dislikes.findIndex((userId) => {

                 return  userId === action.payload
                }), 1);
            }
        },

        dislike: (state, action) => {
            if (!state.video.dislikes.includes(action.payload)) {
                state.video.dislikes.push(action.payload);
                state.video.likes.splice(
                    state.video.likes.findIndex(
                        (userId) => userId === action.payload
                    ),
                    1
                );
            }
        },

        defaultState: (state) => {
            return initialState
        },

    },
/*    extraReducers: {
        [like.pending]: (state) => {
           // state.loading = true;
            state.error = null
        },
        [like.fulfilled]: (state, action) => {
            if(!state.video.likes.includes(action.payload)) {

            }
            state.videos = action.payload;
           // state.loading = false;
        },
        [like.rejected]: (state, action) => {
            //state.loading = false;
            state.error = action.payload;
        },
    }*/
})


// Action creators are generated for each case reducer function
export const { fetchStart, fetchSuccess, fetchFailure, defaultState, like, dislike } = videoSlice.actions



export default videoSlice.reducer