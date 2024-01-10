import React, {useState} from 'react'
import cl from "./Albums.module.scss"
import { H2 } from '../../../../ui/H2/H2'
import { AlbumCard } from '../../../../components/AlbumCard/AlbumCard'
import { appUseDispatch, appUseSelector } from '../../../../hooks/reduxHooks'
import {playSong} from '../../../../store/slices/playSong/playSong'
import { AlbumsModal } from '../AlbumsModal/AlbumsModal'
import { CreateAlbum } from '../CreateAlbum/CreateAlbum'
export const Albums = () => {
  const albums = appUseSelector(state=>state.albums)
  const dispatch = appUseDispatch()
  const [isModalVisible,setModaleVisible] = useState<null|true>(null)
  const [isPack, setPack] = useState<{name:string;img:string;music:number[],id:number}>({name:"",img:"",music:[],id:0})
  const setVisibleModal = (pack:{name:string;img:string;music:number[],id:number})=>{
    setModaleVisible(true)
    setPack(pack)
  }
  return (
    <div className={cl.Albums}>
        <H2 text='Albums'/>
        <div className={cl.AlbumsContainer}>
          <div className={cl.AlbumsList}>
            {albums.map(a=>{
              return <AlbumCard name={a.name} img={a.img} key={a.name} onClick={()=>setVisibleModal({name:a.name,img:a.img,music:a.music,id:a.id})}/>
            })}
          </div>
          <CreateAlbum/>    
        </div>
        <AlbumsModal isPack={isPack} setVisible={setModaleVisible} isVisible={isModalVisible}/>
    </div>
  )
}
