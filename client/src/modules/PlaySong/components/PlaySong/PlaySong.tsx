import { appUseSelector } from '../../../../hooks/reduxHooks'
import cls from "./PlaySong.module.scss"
import { SongInfo } from '../SongInfo/SongInfo'
import { Controls } from '../Controls/Controls'
export const PlaySong = () => {
    const {list,current} = appUseSelector(state=>state.playSong)
    const song = appUseSelector(state=>state.music.find(a=>a.id === list[current]))
    const album = appUseSelector(state=>state.albums.find(a=>a.id === song?.album))
    const author = appUseSelector(state=>state.authors.find(a=>a.id===song?.author))
  return (
    <div className={cls.PlaySong}>
        {list.length && song?
            <>
                <SongInfo name={song.name} album={album?.name || ""} author={author?.name|| ""} img={song.img}/>
                <Controls music={song.music} musicId={song.id} />
            </>
        :
            <></>
        }
    </div>
  )
}
