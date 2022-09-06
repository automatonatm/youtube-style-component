import { configureStore, combineReducers } from '@reduxjs/toolkit'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'


import userReducer from './reducers/userSlice'
import videoReducer from "./reducers/videoSlice";
import channelReducer from "./reducers/channelSlice";
import videosReducer from "./reducers/videosSlice";

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}




const rootReducer = combineReducers({
    user: userReducer,
    video: videoReducer,
    channel: channelReducer,
    videos: videosReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})


export const persistor = persistStore(store)

