import React from 'react'
import { PlaylistCard } from '../../../../components/PlaylistCard/PlaylistCard'
import cl from "./Playlist.module.scss"
import { PlaylistCardAdd } from '../PlaylistCardAdd/PlaylistCardAdd'
import { H2 } from '../../../../ui/H2/H2'
import { appUseSelector } from '../../../../hooks/reduxHooks'
export const Playlist = () => {
    const playlists = appUseSelector(state=>state.playlists)
  return (
    <div className={cl.Playlist}>
        <H2 text='Playlists'/>
        <div>
          <div className={cl.Playlist_List} onWheel={(e)=>{
            e.preventDefault()
            const element = document.querySelector(`.${cl.Playlist_List}`)
            if(element){
              element.scrollBy({
                left: e.deltaY<0?-30:30
              })
            }
          }}>
              {playlists.map((a,i)=>{
              return <PlaylistCard name={a.name} img={a.img} key={`${a.name}/${i}`}/> 
              })}            
          </div>
          <PlaylistCardAdd/>          
        </div>

    </div>
  )
}
