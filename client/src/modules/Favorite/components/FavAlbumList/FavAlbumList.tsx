import React from 'react'
import { AlbumCard } from '../../../../components/AlbumCard/AlbumCard'
import cl from "./FavAlbumList.module.scss"
import { appUseSelector } from '../../../../hooks/reduxHooks'
export const FavAlbumList = () => {
  const albums = appUseSelector(state=>state.albums)
  return (
    <div className={cl.FavAlbumList}>
        {albums.map((a,i)=>{
            return <AlbumCard name={a.name} img={a.img} key={i}/>
        })}
    </div>
  )
}
