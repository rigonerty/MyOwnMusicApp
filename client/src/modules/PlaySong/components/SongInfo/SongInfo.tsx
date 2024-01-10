import React from 'react'
import cl from "./SongInfo.module.scss"
interface props{
    img: string;
    author:string;
    album:string;
    name:string;
}


export const SongInfo = ({img,author,album,name}:props) => {
  return (
    <div className={cl.SongInfo}>
        <img src={img} alt={`Img for ${name}`} />
        <div>
            <p>{name}</p>
            <p>{author&&album?`${author}|${album}`:`${author}${album}`}</p>
        </div>
    </div>
  )
}
