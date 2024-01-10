import { createSlice, PayloadAction,createAsyncThunk } from '@reduxjs/toolkit'


interface IPlaySong{
    list: number[];
    current: number;
}

const initialState:IPlaySong = localStorage.getItem("list")
    ?
        JSON.parse(localStorage.getItem("list")as string)
    :
        {
            list:[],
            current:-1,
        }

export const playSongSlice = createSlice({
    name:"playSong",
    initialState,
    reducers:{
        playSong: (state, action:PayloadAction<IPlaySong>)=>{
            const {list, current} = action.payload
            localStorage.setItem("list", JSON.stringify({list,current}))
            return state = { list, current }
        },
        playNextSong: (state)=>{
            if(state.list.length!==0){
                const limit = state.list.length - 1
                if(state.current === limit) state.current = 0
                else state.current += 1   
                localStorage.setItem("list", JSON.stringify({list:state.list,current:state.current}))
            }

        },
        playPrevSong: (state)=>{
            if(state.list.length!==0){
                const limit = state.list.length - 1
                if(state.current === 0) state.current = limit
                else state.current -= 1  
                localStorage.setItem("list", JSON.stringify({list:state.list,current:state.current}))
            }            
        },
    },
})


export const {playSong,playNextSong,playPrevSong} = playSongSlice.actions

export default playSongSlice.reducer