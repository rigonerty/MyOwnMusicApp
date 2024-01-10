import React, {useRef,useState} from 'react'
import cl from "./ChangeImg.module.scss"
import { appUseSelector } from '../../../../hooks/reduxHooks'
import { Modal } from '../../../../ui/Modal/Modal'
import { ImgCrop } from '../../../../components/ImgCrop/ImgCrop';


interface props{
  setNewAvatar: (smth:string)=>void;
}

export const ChangeImg = ({setNewAvatar}:props) => {
  const ref = useRef<HTMLInputElement>(null)
  const img = appUseSelector(state=>state.user.img)
  const [isImg, setImg]= useState("")
  const [isAvatar, setAvatar] = useState(img)
  const [isVisible,setVisible] = useState<null|true>(null)
  const onFileChange: React.ChangeEventHandler<HTMLInputElement> = (e)=>{
    const file = e.target?.files?.[0]
    if(file){
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = ()=>{
          setImg(reader.result as string)
          setVisible(true)
      }
    }
  }
  const cropped = (img:string)=>{
    setAvatar(img)
    setNewAvatar(img)
    setVisible(null)
  }
  return (
    <div className={cl.ChangeImg}>
        <img src={isAvatar||require("../../../../../public/img/avatar.jpg")} alt="" />
        <button onClick={()=> ref.current?.click()}>
          <p>Change Avatar</p>
        </button>
        <Modal visible={isVisible} setVisible={setVisible}><ImgCrop src={isImg} setCropped={cropped}/></Modal>
        <input ref={ref} type='file' style={{display:"none"}} onChange={onFileChange} accept="image/png,image/jpeg"
/>
    </div>
  )
}
