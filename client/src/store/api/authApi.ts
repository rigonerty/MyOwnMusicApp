import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { actionUser } from '../slices/user/types';
import { IRegisterAndLoginInputs } from './types/authApiTypes';



export const authApi = createApi({
    reducerPath:"authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/auth"
    }),
    endpoints:(build)=> ({
        register: build.mutation<actionUser,IRegisterAndLoginInputs>({
            query:(data)=>({
                url:"register",
                method:"POST",
                body: data,
                credentials:"include"
            })
        }),
        login: build.mutation<actionUser,IRegisterAndLoginInputs>({
            query:(data)=>({
                url:"login",
                method:"POST",
                body:data,
                credentials:"include"
            })
        }),
        logout: build.mutation<void,void>({
            query:(data)=>({
                url:"logout",
                method:"POST",
                credentials:"include"
            })
        }),
        refresh: build.query<actionUser,void>({
            query:()=>({
                url:"refresh",
                method:"GET",
                credentials:"include"
            })
        }),
    }),
})

export const {useRegisterMutation,useRefreshQuery, useLoginMutation, useLogoutMutation} = authApi