import { createSlice, PayloadAction,createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';


interface album{
    name:string;
    id:number;
    img:string;
    author:number;
    music: number[];
}

const initialState:album[] = []

export const albumSlice = createSlice({
    name:"album",
    initialState,
    reducers:{
        addAlbum:(state,action:PayloadAction<album>)=>{
            const {id}= action.payload 
            const isExist = state.find(a=>a.id === id)
            if(!isExist) state.push(action.payload)
        },  
        deleteAlbum:(state,action:PayloadAction<number>)=>{
            state = state.filter(a=>a.id !== action.payload)
        },
        updateAlbum:(state,action:PayloadAction<album>)=>{
            const {id,img,name,author,music}= action.payload 
            const isExist = state.find(a=>a.id === id)
            if(isExist) {
                isExist.name = name;
                isExist.music = music;
                isExist.author = author;
                isExist.img = img;
            }         
        },
    },
})

export const {addAlbum,updateAlbum,deleteAlbum} = albumSlice.actions


export default albumSlice.reducer