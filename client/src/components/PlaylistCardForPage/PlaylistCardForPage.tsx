import React from 'react'
import cl from "./PlaylistCardForPage.module.scss"
interface props{
    img: string;
    name:string;
    onClick?:(i:number)=>void;
    index:any
}
export const PlaylistCardForPage = ({img,name,onClick=()=>{},index}:props) => {
  return (
    <div className={cl.PlaylistCardForPage} onClick={()=>onClick(index)}>
        <img src={img} alt="" />
        <p>{name}</p>
    </div>
  )
}
