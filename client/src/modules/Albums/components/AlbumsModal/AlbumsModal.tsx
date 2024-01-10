import React, {useEffect, useState,useLayoutEffect} from 'react'
import { AlbumModal } from '../../../../components/AlbumModal/AlbumModal'
import { MusicCard } from '../../../../components/MusicCard/MusicCard';
import { appUseDispatch, appUseSelector } from '../../../../hooks/reduxHooks';
import { playSong } from '../../../../store/slices/playSong/playSong';
import { setFavorite } from '../../../../store/slices/user/user';
import { useFavoriteMutation } from '../../../../store/api/userApi';
import { IoTrendingUpSharp } from 'react-icons/io5';
import { deleteAlbum } from '../../../../store/slices/albums/albums';
import { useLazyDeleteAlbumQuery } from '../../../../store/api/albumApi';

interface props{
  isVisible: null|true;
  setVisible: (smth:props["isVisible"])=>void;
  isPack: {name:string;img:string;music:number[], id:number}
}


export const AlbumsModal = ({isVisible,setVisible, isPack}:props) => {
  const dispatch = appUseDispatch()
  const neededFav = appUseSelector(state=>state.user.fav.find(a=>a.id===isPack.id && a.type==="album"))
  const [isFav,setFav] = useState(neededFav?true:false)
  const {id,fav} = appUseSelector(state=>state.user)
  const [saveFav] = useFavoriteMutation()
  const [deleteFromDB] = useLazyDeleteAlbumQuery()
  const play = ()=>{
    dispatch(playSong({list: isPack.music, current:0}))
    setVisible(null)
  }
  const edit = ()=>{}
  const deleteThisAlbum = ()=>{
    dispatch(deleteAlbum(isPack.id))
    deleteFromDB(isPack.id)
  }
  useEffect(()=>{
    if(neededFav) setFav(true)
    else setFav(false)
  },[neededFav])
  useEffect(()=>{
    saveFav({id, fav})
  },[fav])


  const music = appUseSelector(state=>state.music)
  const packMusic = [] as typeof music
  isPack.music.map(a=>{
    const needed = music.find(t=>t.id===a)
    if(needed) packMusic.push(needed)
  })
  return (
    <AlbumModal 
      isVisible={isVisible} setVisible={setVisible} 
      isFav={isFav} setFav={()=>dispatch(setFavorite({type:"album", id:isPack.id}))}
      pack={isPack} play={play} edit={edit} deleteAlbum={deleteThisAlbum}>
        {packMusic.map((a,i)=>{
          return <MusicCard text="" name={a.name} author={"a.author"} album={isPack.name} img={a.img} onClick={()=>dispatch(playSong({list: isPack.music, current:i}))} type='line'/>
        })}
    </AlbumModal>
  )
}
 