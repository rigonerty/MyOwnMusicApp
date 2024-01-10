import { useEffect, useRef, useState } from 'react'
import cl from "./Controls.module.scss"
import {
  IoPlaySkipBackSharp,
  IoPlaySkipForwardSharp,
  IoPlaySharp,
  IoPauseSharp,
} from 'react-icons/io5';
import { ProgressBar } from '../ProgressBar/ProgressBar';
import { Volume } from '../Volume/Volume';
import { appUseDispatch } from '../../../../hooks/reduxHooks';
import { playNextSong, playPrevSong } from '../../../../store/slices/playSong/playSong';
import { Fav } from '../Fav/Fav';
interface props{
  music: string;
  musicId:number;
}
export const Controls = ({music,musicId}:props) => {
    const [isPlaying, setPlaying] = useState(false)
    const audioRef = useRef<HTMLAudioElement|null>(null)
    const [isDuration,setDuration] = useState(0)
    const dispatch = appUseDispatch()
  useEffect(() => {
    if(audioRef.current){
        if (isPlaying) audioRef.current.play()
        else audioRef.current.pause();
    }
  }, [isPlaying, audioRef]);
  return (
    <>
      <div className={cl.Controls}>
          <div>
            <button onClick={()=>dispatch(playPrevSong())}><IoPlaySkipBackSharp size="2em"/></button>
            <button onClick={()=>setPlaying(prev=>!prev)}>{isPlaying?<IoPauseSharp size="2em"/>:<IoPlaySharp size="2em"/>}</button>
            <button onClick={()=>dispatch(playNextSong())}><IoPlaySkipForwardSharp size="2em"/></button>          
          </div>
          <audio src={music} ref={audioRef} onDurationChange={(e)=>setDuration(e.currentTarget.duration)}/>
          <ProgressBar audioRef={audioRef} duration={isDuration}/>
      </div>
      <div className={cl.Controls2}>
        <Fav type="music" id={musicId}/>
        <Volume audioRef={audioRef}/>
      </div>  
    </>

  )
}
