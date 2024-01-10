import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IRespAuthor } from './types/authorApiTypes';


export const authorApi = createApi({
    reducerPath:"authorApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/author"
    }),
    endpoints:(build)=> ({
        getAuthorById: build.query< IRespAuthor,number>({
            query: (id)=>({
                url: `/getAuthorById/${id}`,
                method: "GET",
            })
        }),
        addAuthor: build.mutation< IRespAuthor,{name:string,music:number[]}>({
            query: (data)=>({
                url: `/createAuthor`,
                method: "POST",
                body:data,
            })
        }),
        updateAuthor: build.mutation< IRespAuthor,IRespAuthor>({
            query: (data)=>({
                url: `/updateAuthor`,
                method: "PUT",
                body:data,
            })
        }),
        deleteAuthor: build.query< void,number>({
            query: (id)=>({
                url: `/deleteAuthor/${id}`,
                method: "DELETE",
            })
        }),
    }),
})

export const {useAddAuthorMutation, useUpdateAuthorMutation, useLazyGetAuthorByIdQuery,useLazyDeleteAuthorQuery} = authorApi