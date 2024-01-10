import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/user/user'
import { authApi } from './api/authApi'
import { musicApi } from './api/musicApi'
import musicSlice from './slices/music/music'
import playSongSlice from './slices/playSong/playSong'
import albumsSlice from './slices/albums/albums'
import authorsSlice from './slices/authors/authors'
import playlistsSlice from './slices/playlists/playlists'
import { albumApi } from './api/albumApi'
import {userApi} from "./api/userApi"
import { authorApi } from './api/authorApi'
const store = configureStore({
    reducer:{
        [authApi.reducerPath]: authApi.reducer,
        [musicApi.reducerPath]: musicApi.reducer,
        [albumApi.reducerPath]: albumApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [authorApi.reducerPath]: authorApi.reducer,
        albums:albumsSlice,
        authors:authorsSlice,
        playlists:playlistsSlice,
        user: userSlice,
        music: musicSlice,
        playSong: playSongSlice
    },
    middleware: (getDefaultMiddleware)=> getDefaultMiddleware({
          immutableCheck: false,
          serializableCheck: false,
    }).concat([musicApi.middleware,authApi.middleware, albumApi.middleware, userApi.middleware,authorApi.middleware])
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store