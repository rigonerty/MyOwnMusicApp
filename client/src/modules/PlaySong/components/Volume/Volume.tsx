import React,{useState,useEffect} from 'react'
import { IoVolumeHigh, IoVolumeMute } from 'react-icons/io5';
import cl from "./Volume.module.scss"

interface props{
    audioRef: React.MutableRefObject<HTMLAudioElement|null>;
}

export const Volume = ({audioRef}:props) => {
    const [isVolume,setVolume] = useState(100)
    const [offVolume,setOffVolume] = useState(false)
    useEffect(()=>{
        if(audioRef.current)  {
            if(offVolume) audioRef.current.volume = 0;
            else audioRef.current.volume = isVolume / 100;
            
        }
    }, [audioRef, isVolume, offVolume])
    const clickHandler = (e:React.MouseEvent<HTMLElement>)=>{
        const procent = (e.currentTarget.offsetLeft - e.clientX)/e.currentTarget.offsetWidth*-100
        setVolume(procent)
        if(offVolume) setOffVolume(false)
    }
  return (
    <div className={cl.Volume}>
        {   offVolume
        ?<IoVolumeMute size={"1.5em"} cursor={"pointer"} onClick={()=>{
                setOffVolume(false)
                if(audioRef.current) audioRef.current.volume = isVolume / 100;
            }}/>
        : <IoVolumeHigh size={"1.5em"} cursor={"pointer"} onClick={()=>{
            setOffVolume(true)
                if(audioRef.current) audioRef.current.volume = 0
            }}/>


        }

        <div onClick={clickHandler}>
            <span style={offVolume?{}:{width:isVolume+"%"}}></span>
        </div>
    </div>
  )
}
