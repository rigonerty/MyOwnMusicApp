import React, { useEffect,useState } from 'react'
import cl from "./ProgressBar.module.scss"


interface props{
  audioRef: React.MutableRefObject<HTMLAudioElement|null>;
  duration: number;
}


const toTime = (a:number)=>{
  a = Math.floor(a)
  const minutes = Math.floor(a/60)
  const seconds = a - 60*minutes 
  return `${minutes}`.padStart(2,"0")+":"+`${seconds}`.padStart(2,"0")
}
export const ProgressBar = ({audioRef,duration}:props) => {
  const [isTime, setTime] = useState(0)
  useEffect(()=>{
    const interval = setInterval(()=>{
      if(audioRef.current) setTime(audioRef.current.currentTime)
    },1000)
    if(audioRef.current && isTime >= duration) clearInterval(interval)
    return ()=> clearInterval(interval)
  },[duration])
  const clickHandler = (e:React.MouseEvent<HTMLElement>)=>{
    if(audioRef.current){
      const procent = (e.currentTarget.offsetLeft - e.clientX)/e.currentTarget.offsetWidth*-100
      audioRef.current.currentTime = procent/100*duration
      setTime(procent/100*duration)
    }
  }
  return (
    <div className={cl.ProgressBar}>
      {audioRef.current &&
        <>
          <div onClick={clickHandler}>
              <span style={{width: `${isTime/duration*100}%`}}><i></i></span>
          </div>
          <p>
            {toTime(isTime)}/{toTime(duration||0)}
          </p>       
        </>
      }

    </div>
  )
}
