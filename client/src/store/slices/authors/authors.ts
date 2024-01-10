import { createSlice, PayloadAction,createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';


interface author{
    name:string;
    id:number;
    music: number[];
}

const initialState:author[] = []

export const authorSlice = createSlice({
    name:"author",
    initialState,
    reducers:{
        addAuthor:(state,action:PayloadAction<author>)=>{
            const {id}= action.payload 
            const isExist = state.find(a=>a.id === id)
            if(!isExist) state.push(action.payload)
        },  
        deleteAuthor:(state,action:PayloadAction<number>)=>{
            state = state.filter(a=>a.id !== action.payload)
        },
        updateAuthor:(state,action:PayloadAction<author>)=>{
            const {id,name,music}= action.payload 
            const isExist = state.find(a=>a.id === id)
            if(isExist) {
                isExist.name = name;
                isExist.music = music;
            }         
        },
    },
})


export const {addAuthor,updateAuthor,deleteAuthor} = authorSlice.actions

export default authorSlice.reducer