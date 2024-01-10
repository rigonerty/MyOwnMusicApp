import { createSlice, PayloadAction,createAsyncThunk } from '@reduxjs/toolkit'


interface music{
    name:string;
    id:number;
    img:string;
    album:number;
    author:number;
    music: string;
}

const initialState:music[] = []

export const musicSlice = createSlice({
    name:"music",
    initialState,
    reducers:{
        addMusic:(state,action:PayloadAction<music>)=>{
            const {id}= action.payload 
            const isExist = state.find(a=>a.id === id)
            if(!isExist) state.push(action.payload)
        },  
        deleteMusic:(state,action:PayloadAction<number>)=>{
            state = state.filter(a=>a.id !== action.payload)
        },
        updateMusic:(state,action:PayloadAction<music>)=>{
            const {id,img,name,author,music,album}= action.payload 
            const isExist = state.find(a=>a.id === id)
            if(isExist) {
                isExist.name = name;
                isExist.album = album;
                isExist.music = music;
                isExist.author = author;
                isExist.img = img;
            }         
        },
    },
})


export const {addMusic,deleteMusic,updateMusic} = musicSlice.actions

export default musicSlice.reducer