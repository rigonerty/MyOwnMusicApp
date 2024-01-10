import React, {useEffect, useState} from 'react'
import cl from "./CreateAlbum.module.scss"
import { Modal } from '../../../../ui/Modal/Modal'
import { CreateAlbumPlaylistModal } from '../CreateAlbumPlaylistModal/CreateAlbumPlaylistModal'
import { appUseDispatch, appUseSelector } from '../../../../hooks/reduxHooks'
import { ImgCrop } from '../../../../components/ImgCrop/ImgCrop'
import { CreateAlbumMusicList } from '../CreateAlbumMusicList/CreateAlbumMusicList'
import { useAddAuthorMutation } from '../../../../store/api/authorApi'
import { addAuthor } from '../../../../store/slices/authors/authors'
export const CreateAlbum = () => {
    const [isModalVisible, setModaleVisible] = useState<null|true>(null)
    const [isCropperVisible,setCropperVisible] = useState<null|true>(null)
    const [isLoadedImg, setLoadedImg] = useState("")
    const [isCroppedImg, setCroppedImg] = useState("")
    const authors = appUseSelector(state=>state.authors)
    const authorsList = authors.map(a=>({title:a.name, value:""+a.id}))
    const dispatch = appUseDispatch() 
    const [addAuthorToDB,{data}] = useAddAuthorMutation()
    const [isSelectedMusicList, setSelectedMusicList] = useState<number[]>([])
    const [isSelectedAuthor, setSelectedAuthor] = useState(authorsList[0]||{title:"None", value:"0"})
    const create = ({name,author}:{name:string;author:number})=>{

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
      setSelectedAuthor(authorsList[0])
    }, [authors])
    const onFileChange:React.ChangeEventHandler<HTMLInputElement> = (e)=>{
      const file = e.target?.files?.[0]
      if(file){
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = ()=>{
            setLoadedImg(reader.result as string)
            setCropperVisible(true)
        }
      }
    }
    const cropped = (img:string)=>{
      setCroppedImg(img)
      setCropperVisible(null)
    }
  return (
    <>
        <div className={cl.CreateAlbum} onClick={()=>setModaleVisible(true)}>
            <p><span>+</span> Add</p>
        </div>    
        <CreateAlbumPlaylistModal 
          isVisible={isModalVisible} setVisible={setModaleVisible} 
          create={create}  authors={authorsList} 
          onFileChange={onFileChange} isCroppedImg={isCroppedImg}
          isSelectValue={isSelectedAuthor} setSelectValue={setSelectedAuthor} createAuthor={createAuthor}>
              <CreateAlbumMusicList
               isSelectedMusicList={isSelectedMusicList} 
               setSelectedMusicList={setSelectedMusicList}
               isSelectedAuthor={isSelectedAuthor}/>
        </CreateAlbumPlaylistModal>
        <Modal visible={isCropperVisible} setVisible={setCropperVisible}><ImgCrop src={isLoadedImg} setCropped={cropped}/></Modal>
    </>

  )
}
