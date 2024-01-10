import React, { useState } from 'react'
import { MusicCard } from '../../../../components/MusicCard/MusicCard'
import cl from "./FavMusicList.module.scss"
import { appUseDispatch, appUseSelector } from '../../../../hooks/reduxHooks'
import { playSong } from '../../../../store/slices/playSong/playSong'

interface props{
  fav: {type:"music", id:number}[]
}
export const FavMusicList = ({fav}:props) => {
    // const [isType,setType] = useState<"block"|"line">("block")
    const albumsName = appUseSelector(state=>state.albums.map(a=>({name:a.name,id:a.id})))
    const music = appUseSelector(state=>state.music)
    const favMusic = fav.map(a=>music.find(t=>t.id===a.id)).filter(a=> a !== undefined)
    const dispatch = appUseDispatch()
  return (
    <div className={cl.FavMusicList}>
        {
            favMusic.map((a,i)=>{
                if(!a) return <></>
                return <MusicCard name={a.name} img={a.img} text={""} album={albumsName.find(t=>t.id===a.album)?.name||""} author={"a.author"} type='block' key={i} onClick={()=>dispatch(playSong({list:fav.map(t=>t.id),current:i}))}/>
            })
        }
    </div>
  )
}
