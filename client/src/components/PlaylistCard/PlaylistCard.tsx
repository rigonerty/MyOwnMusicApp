import React from 'react'
import cl from "./PlaylistCard.module.scss"
interface props{
    img: string;
    name: string;
    alt?:string;
}
export const PlaylistCard = ({img, name,alt=""}:props) => {
  return (
    <div className={cl.PlaylistCard}>
      <div className={cl.DivName}><p>{name}</p></div>
      <div><img src={img} alt={alt} /></div>
      <div className={cl.DivNameHover}><p>{name}</p></div>
    </div>
  )
}
