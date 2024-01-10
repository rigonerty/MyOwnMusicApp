import { createSlice, PayloadAction,createAsyncThunk } from '@reduxjs/toolkit'
import { IFavorite, ISetUser, IUser, actionUser } from './types'




const initialState:IUser = {
    isAuth: false,
    name:"",
    id:0,
    img:"",
    email: "",
    fav:[],
    theme:"white",
    language:"english"
}
 

export const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        logout:()=> initialState,
        setUser:(state, action:PayloadAction<ISetUser>)=>{
            const {id,email,name,img,language,theme,fav} = action.payload
            state.isAuth = true;
            state.id = id;
            state.email = email;
            state.name = name;
            state.img = img;
            state.language = language;
            state.theme = theme;
            state.fav = fav;
        },
        setFavorite:(state,action:PayloadAction<IFavorite>)=>{
            const {type, id} = action.payload
            const exist = state.fav.find(a=>a.id===id)
            if(exist) state.fav = state.fav.filter(a=>a.id!==id)
            else state.fav.push({type,id})
        }
    },
    extraReducers(builder) {},
})

export const {logout,setUser, setFavorite} = userSlice.actions

export default userSlice.reducer