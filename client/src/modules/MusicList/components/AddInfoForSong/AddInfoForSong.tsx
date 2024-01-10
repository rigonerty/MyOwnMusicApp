import React, { useEffect, useRef, useState } from 'react'
import cl from "./AddInfoForSong.module.scss"
import { Input } from '../../../../ui/Input/Input'
import { Select } from '../../../../ui/Select/Select'
import { appUseDispatch, appUseSelector } from '../../../../hooks/reduxHooks'
import { IoCloudDownloadOutline } from 'react-icons/io5'
import { ISendRequest } from '../../types/addSongTypes'
import { SelectAuthor } from '../../../../components/SelectAuthor/SelectAuthor'
import { useAddAuthorMutation } from '../../../../store/api/authorApi'
import { addAuthor } from '../../../../store/slices/authors/authors'
interface props{
  createSong: (smth:ISendRequest)=>void
}
export const AddInfoForSong = ({createSong}:props) => {
    const [isName,setName] = useState("")
    const ref = useRef<HTMLInputElement>(null)
    const authors = appUseSelector(state=>state.authors)
    const authorsList = authors.map(a=>({title:a.name, value:""+a.id}))
    const [isAuthor,setAuthor] = useState(authorsList[0])
    const albums = appUseSelector(state=>state.albums)
    const [isAlbum, setAlbum] = useState({title:"None", value:"0"})
    const [isSongFile, setSongFile] = useState("")

    const dispatch = appUseDispatch() 
    const [addAuthorToDB,{data}] = useAddAuthorMutation()
    
    let listOfAuthorAlbums:{title:string;value:string}[] = []

    if(isAuthor){
        listOfAuthorAlbums = albums.filter(a=>""+a.author===isAuthor.value).map(a=>({title:a.name, value:""+a.id}))
    }


    const createAuthor = (authorName:string)=>{
      if(authorName){
        addAuthorToDB({name:authorName, music:[]})
      }
    }
    useEffect(()=>{
      if(data){
        dispatch(addAuthor(data))
      }
    }, [data])


    useEffect(()=>{
        setAuthor(authorsList[0])
    }, [authors])
    const onFileChange: React.ChangeEventHandler<HTMLInputElement> = (e)=>{
        const file = e.target?.files?.[0]
        if(file){
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = ()=>{
            setSongFile(reader.result as string)
          }
        }
    }
  return (
    <div className={cl.AddInfoForSong}>
        <Input isValue={isName} setValue={setName} placeholder='Name for song' name='Name'/>
        <p>Author: </p>
        <SelectAuthor isSelectValue={isAuthor} setSelectValue={setAuthor} authors={authorsList} createAuthor={createAuthor}/>
        <p>Album: </p>
        {isAlbum && <Select isValue={isAlbum} setValue={setAlbum} options={[{title:"None", value:"0"},...listOfAuthorAlbums]} />}
        <div className={cl.LoadSong}>
          <input type='file' style={{display:"none"}} ref={ref} onChange={onFileChange} accept='.mp3, .wav, .aiff'/>
          <button onClick={()=>ref?.current?.click()}><IoCloudDownloadOutline size={"1.5em"}/></button>
          <audio src={isSongFile} controls/>          
        </div>
        <div className={cl.create}>
          <button onClick={()=>createSong({name:isName, author:+isAuthor.value,album:+isAlbum.value,music:isSongFile})}>Create</button>
        </div>
    </div>
  )
}
