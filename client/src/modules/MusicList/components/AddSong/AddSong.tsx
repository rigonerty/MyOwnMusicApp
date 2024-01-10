import React,{useState} from 'react'
import cl from "./AddSong.module.scss"
import { Modal } from '../../../../ui/Modal/Modal'
import { AddImgForSong } from '../AddImgForSong/AddImgForSong'
import { AddInfoForSong } from '../AddInfoForSong/AddInfoForSong'
import { useAddMusicMutation } from '../../../../store/api/musicApi'
import { ISendRequest } from '../../types/addSongTypes'
import { addMusic } from '../../../../store/slices/music/music'
import { appUseSelector } from '../../../../hooks/reduxHooks'



export const AddSong = () => {
    const [isModalVisible,setModalVisible] = useState<null|true>(null)
    const [isCroppedImg, setCroppedImg] = useState("")
    const [sendRequest,{data}] = useAddMusicMutation()
    const [isMusic, setMusic] = useState("")
    const id = appUseSelector(state=>state.user.id)
    const createSong = ({name,music,album,author}:ISendRequest)=>{
      if(name&&music){
        sendRequest({name,music,album,author,img:isCroppedImg, userId:id})
        setMusic(music)
        setModalVisible(null)
      }

    }
    if(data && isMusic){
      const music = {
        name:data.name,
        author:data.author,
        album:data.album,
        id:data.id,
        img:isCroppedImg,
        music:isMusic
      }
      addMusic(music)
    }
  return (
    <>
        <button className={cl.addSong} onClick={()=>setModalVisible(true)}><span>+</span></button>
        <Modal visible={isModalVisible} setVisible={setModalVisible}>
            <div className={cl.addSongModal}>
                <AddImgForSong isCroppedImg={isCroppedImg} setCroppedImg={setCroppedImg}/>
                <AddInfoForSong createSong={createSong}/>
            </div>
        </Modal>
    </>
  )
}
