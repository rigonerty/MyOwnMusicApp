import React from 'react'
import cl from "./AlbumCard.module.scss"
interface props{
    name:string;
    img: string;
    alt?:string;
    onClick?:()=> void
}
export const AlbumCard = ({name,img, alt="", onClick=()=>{}}:props) => {
  return (
    <div className={cl.AlbumCard} onClick={onClick} tabIndex={0}>
        <p>{name}</p>
        <div></div>
        <img src={img} alt={alt} />
    </div>
  )
}
