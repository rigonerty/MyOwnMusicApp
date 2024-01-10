import React from 'react'
import cl from "./SelectType.module.scss"
interface props{
    isSelected: "album"|"music"|"playlist";
    setSelected: (smth:"album"|"music"|"playlist")=>void
}


export const SelectType = ({isSelected,setSelected}:props) => {
  return (
    <div className={cl.SelectType}>
        <button onClick={()=>setSelected("music")} className={isSelected==="music"?cl.active:""}>Music</button>
        <button onClick={()=>setSelected("album")} className={isSelected==="album"?cl.active:""}>Albums</button>
        <button onClick={()=>setSelected("playlist")} className={isSelected==="playlist"?cl.active:""}>Playlists</button>
    </div>
  )
}
