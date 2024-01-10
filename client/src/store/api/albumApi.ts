import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { actionUser } from '../slices/user/types';
import { IAlbumResponceOrReq } from './types/albumApiTypes';


export const albumApi = createApi({
    reducerPath:"albumApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/album"
    }),
    endpoints:(build)=> ({
        getAlbumById: build.query< IAlbumResponceOrReq,number>({
            query: (id)=>({
                url: `/getAlbumById/${id}`,
                method: "GET",
            })
        }),
        addAlbum: build.mutation< IAlbumResponceOrReq,IAlbumResponceOrReq>({
            query: (data)=>({
                url: `/createAlbum`,
                method: "POST",
                body:data,
            })
        }),
        updateAlbum: build.mutation< IAlbumResponceOrReq,IAlbumResponceOrReq>({
            query: (data)=>({
                url: `/updateAlbum`,
                method: "PUT",
                body:data,
            })
        }),
        deleteAlbum: build.query< void,number>({
            query: (id)=>({
                url: `/deleteAlbum/${id}`,
                method: "DELETE",
            })
        }),
    }),
})

export const {useAddAlbumMutation, useUpdateAlbumMutation, useLazyGetAlbumByIdQuery,useLazyDeleteAlbumQuery} = albumApi