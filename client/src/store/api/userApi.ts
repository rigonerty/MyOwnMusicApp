import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IFavorite, IUpdate, IUpdateRes } from './types/userApiTypes';



export const userApi = createApi({
    reducerPath:"userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/user"
    }),
    endpoints:(build)=> ({
        update: build.mutation<IUpdateRes,IUpdate>({
            query: (data)=>({
                url:"update",
                body: data,
                method:"POST"
            })
        }),
        favorite: build.mutation<{fav:IFavorite[]},IFavorite>({
            query: (data)=>({
                url:"favorite",
                body: data,
                method:"POST"
            })
        })
    }),
})

export const {useUpdateMutation, useFavoriteMutation} = userApi