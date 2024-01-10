import React, {useEffect, useState} from 'react'
import { MusicCard } from '../../../../components/MusicCard/MusicCard'
import { appUseSelector } from '../../../../hooks/reduxHooks'

interface props{
    isSelectedMusicList: number[];
    setSelectedMusicList: React.Dispatch<React.SetStateAction<number[]>>;
    isSelectedAuthor: {title:string; value:string}
}

export const CreateAlbumMusicList = ({isSelectedMusicList,setSelectedMusicList, isSelectedAuthor}:props) => {
    const allMusicList = appUseSelector(state=>state.music)
    const [musicList, setMusicList] = useState<typeof allMusicList>([])
    useEffect(()=>{
        if(isSelectedAuthor && allMusicList){
            setMusicList(allMusicList.filter(a=>a.author === +isSelectedAuthor.value && !a.album))
        }
    }, [isSelectedAuthor])
    const addOrRemoveSong = (id:number)=>{
      if(isSelectedMusicList.find(a=>a===id)) setSelectedMusicList(prev=>prev.filter(a=>a!==id))
      else setSelectedMusicList(prev=>[...prev, id])
    }

  return (
    <>
        {musicList.length > 0
            ?
            <>
                {
                musicList.map(a=>{
                    return <MusicCard 
                            name={a.name} 
                            album={""}
                            author={isSelectedAuthor.title}
                            text=''
                            img={a.img}
                            type="line"
                            mainStyle={isSelectedMusicList.find(t=>t===a.id)?{border:"1px solid rgb(228, 194, 1)"}:{}}
                            onClick={()=>addOrRemoveSong(a.id)}/>
                })   
                }         
            </>
            :
            <p>
                Not found
            </p>
        }
    </>
  )
}
