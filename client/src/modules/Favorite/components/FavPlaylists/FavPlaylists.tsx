import React from 'react'
import { PlaylistCardForPage } from '../../../../components/PlaylistCardForPage/PlaylistCardForPage'
import cl from "./FavPlaylists.module.scss"
export const FavPlaylists = () => {
    const fakeApi = [
        {img: require("../../../../../public/img/TestPlaylistImage.jpg"), name: "playlist 1", alt: "", description:"Это вечерный плейлист для коротания времени во время отдыха."},
        {img: require("../../../../../public/img/DefaultPlaylistImage.jpg"), name: "playlist 2", alt: "", description:"lorem ipsum sit amet dolor felor ti apolor roer tu doplio."},
        {img: require("../../../../../public/img/DefaultPlaylistImage.jpg"), name: "playlist 3", alt: "", description:"lorem ipsum sit amet dolor felor ti apolor roer tu doplio."},
        {img: require("../../../../../public/img/DefaultPlaylistImage.jpg"), name: "playlist 4", alt: "", description:"lorem ipsum sit amet dolor felor ti apolor roer tu doplio."},
        {img: require("../../../../../public/img/DefaultPlaylistImage.jpg"), name: "playlist 5", alt: "", description:"lorem ipsum sit amet dolor felor ti apolor roer tu doplio."},
        {img: require("../../../../../public/img/DefaultPlaylistImage.jpg"), name: "playlist 6", alt: "", description:"lorem ipsum sit amet dolor felor ti apolor roer tu doplio."},
        {img: require("../../../../../public/img/DefaultPlaylistImage.jpg"), name: "playlist 7", alt: "", description:"lorem ipsum sit amet dolor felor ti apolor roer tu doplio."},
    ]
  return (
    <div className={cl.FavPlaylists}>
        {fakeApi.map((a,i)=>{
            return <PlaylistCardForPage name={a.name} img={a.img} index={i} key={i}/>
        })}
    </div>
  )
}
