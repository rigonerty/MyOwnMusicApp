import React, { useEffect, useState } from 'react'
import { IoHeartOutline, IoHeartSharp } from 'react-icons/io5'
import { appUseDispatch, appUseSelector } from '../../../../hooks/reduxHooks';
import { setFavorite } from '../../../../store/slices/user/user';
import cl from "./Fav.module.scss"
import { useFavoriteMutation } from '../../../../store/api/userApi';
interface props{
    type:"music"|"album"|"playlist";
    id:number
}
export const Fav = (props:props) => {
    const user = appUseSelector(state=>state.user)
    const fav = user.fav.filter(a=>a.type===props.type).find(a=>a.id===props.id)
    const [isFav,setFav] = useState(fav?true:false)
    const [sendFavoriteToServer] = useFavoriteMutation()
    const dispatch = appUseDispatch()
    const clickHandler = ()=>{
        setFav(!isFav)
        dispatch(setFavorite(props))
    }
    useEffect(()=>{
        setFav(fav?true:false)
        sendFavoriteToServer({id:user.id, fav:user.fav})
    },[fav])
  return (
    <button onClick={clickHandler} className={cl.Fav}>
        {isFav?<IoHeartSharp size={"1.5em"} cursor={"pointer"}/>:<IoHeartOutline size={"1.5em"} cursor={"pointer"}/>}
    </button>
  )
}
