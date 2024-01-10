import React, { useState } from 'react'
import { H2 } from '../../../../ui/H2/H2'
import { FavMusicList } from '../FavMusicList/FavMusicList'
import { FavAlbumList } from '../FavAlbumList/FavAlbumList'
import { FavPlaylists } from '../FavPlaylists/FavPlaylists'
import { SelectType } from '../SelectType/SelectType'
import { appUseSelector } from '../../../../hooks/reduxHooks'

export const Favorites = () => {
  const [isSelected, setSelected] = useState<"music"|"album"|"playlist">("music")
  const fav = appUseSelector(state=>state.user.fav)
  return (
    <div>
      <SelectType isSelected={isSelected} setSelected={setSelected}/>
      {isSelected==="music"&&<FavMusicList fav={fav.filter(a=>a.type==="music") as {type:"music",id:number}[]}/>}
      {isSelected==="album"&&<FavAlbumList/>}
      {isSelected==="playlist"&&<FavPlaylists/>}
    </div>
  )
}
