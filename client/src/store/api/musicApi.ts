import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { actionUser } from '../slices/user/types';
import { IAddMusic , IMusicResponse, IUpdateMusic} from './types/musicApiTypes';



export const musicApi = createApi({
    reducerPath:"musicApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/music"
    }),
    endpoints:(build)=> ({
        getMusicById: build.query< IMusicResponse,number>({
            query: (id)=>({
                url: `/getMusicById/${id}`,
                method: "GET",
            })
        }),
        getAllMusic: build.query< IMusicResponse[],void>({
            query: ()=>({
                url: `/getAllMusicByUserId`,
                method: "GET",
            })
        }),
        addMusic: build.mutation< IMusicResponse, IAddMusic>({
            query: (data)=>({
                url: `/addMusic`,
                method: "POST",
                body:data,
            })
        }),
        updateMusic: build.mutation< IMusicResponse,IUpdateMusic>({
            query: (data)=>({
                url: `/updateMusic`,
                method: "PUT",
                body:data,
            })
        }),
        deleteMusic: build.query< void,number>({
            query: (id)=>({
                url: `/deleteMusic/${id}`,
                method: "DELETE",
            })
        }),
    }),
})

export const {useUpdateMusicMutation, useDeleteMusicQuery, useGetAllMusicQuery, useGetMusicByIdQuery,useAddMusicMutation, useLazyGetMusicByIdQuery} = musicApi