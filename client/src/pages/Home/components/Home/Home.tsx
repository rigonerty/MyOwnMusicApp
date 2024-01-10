import React from 'react'
import { Playlist } from '../../../../modules/Playlist'
import { Albums } from '../../../../modules/Albums'
import { MusicList } from '../../../../modules/MusicList'

export const Home = () => {
  return (
    <div>
      <Playlist/>
      <Albums/>
      <MusicList/>
    </div>
  )
}
