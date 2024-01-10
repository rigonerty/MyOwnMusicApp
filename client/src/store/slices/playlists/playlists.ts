import { createSlice, PayloadAction,createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';


interface playlist{
    name:string;
    id:number;
    img:string;
    music: number[];
}

const initialState:playlist[] = []

export const playlistSlice = createSlice({
    name:"playlist",
    initialState,
    reducers:{
        addPlaylist:(state,action:PayloadAction<playlist>)=>{
            const {id}= action.payload 
            const isExist = state.find(a=>a.id === id)
            if(!isExist) state.push(action.payload)
        },  
        deletePlaylist:(state,action:PayloadAction<number>)=>{
            state = state.filter(a=>a.id !== action.payload)
        },
        updatePlaylist:(state,action:PayloadAction<playlist>)=>{
            const {id,img,name,music}= action.payload 
            const isExist = state.find(a=>a.id === id)
            if(isExist) {
                isExist.name = name;
                isExist.music = music;
                isExist.img = img;
            }         
        },
    },
})

export default playlistSlice.reducer