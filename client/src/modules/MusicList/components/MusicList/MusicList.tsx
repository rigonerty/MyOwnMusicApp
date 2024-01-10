import React, { useState } from 'react'
import { H2 } from '../../../../ui/H2/H2'
import { MusicCard } from '../../../../components/MusicCard/MusicCard'
import cl from "./MusicList.module.scss"
import { ChangeView } from '../ChangeView/ChangeView'
import { appUseDispatch, appUseSelector } from '../../../../hooks/reduxHooks'
import {playSong} from '../../../../store/slices/playSong/playSong'
export const MusicList = () => {
    const music = appUseSelector(state=>state.music)
    const albumNames = appUseSelector(state=>state.albums.map(a=>({name:a.name,id:a.id})))
    const authors = appUseSelector(state=>state.authors)
    const dispatch = appUseDispatch()
    const list = music.map(a=>a.id)
    const [isType,setType] = useState<"block"|"line">("block")
  return (
    <div className={cl.MusicList}>
        <H2 text='All Music'/>
        <div>
            <ChangeView isType={isType} setType={setType}/>
            <div className={cl.MusicListContainer}>
                {music.map((a,i)=>{

                    return <MusicCard key={`${a.name}/${a.author}`} 
                        name={a.name} 
                        author={authors.find(t=>t.id===a.author)?.name||""} 
                        album={albumNames.find(t=>t.id===a.album)?.name||""} 
                        img={a.img} 
                        text={"a.text"} 
                        type={isType} 
                        onClick={()=>dispatch(playSong({list,current:i}))}/>
                })}
            </div>
        </div>
    </div>
  )
}
