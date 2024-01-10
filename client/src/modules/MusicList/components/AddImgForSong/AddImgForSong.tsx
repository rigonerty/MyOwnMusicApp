import React,{useRef, useState} from 'react'
import { Modal } from '../../../../ui/Modal/Modal'
import { ImgCrop } from '../../../../components/ImgCrop/ImgCrop'
import cl from "./AddImgForSong.module.scss"
interface props{
    isCroppedImg: string;
    setCroppedImg: (smth:string)=>void;
}

export const AddImgForSong = ({isCroppedImg,setCroppedImg}:props) => {
    const ref = useRef<HTMLInputElement>(null)
    const [isLoadedImg,setLoadedImg] = useState("")
    const [isCropModal, setCropModal] = useState<null|true>(null)
    const cropped = (img:string)=>{
        setCroppedImg(img)
        setCropModal(null)
    }
    const onFileChange: React.ChangeEventHandler<HTMLInputElement> = (e)=>{
        const file = e.target?.files?.[0]
        if(file){
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = ()=>{
            setLoadedImg(reader.result as string)
            setCropModal(true)
        }
        }
    }
  return (
    <div className={cl.AddImgForSong}>
        <div>
            <input type='file' accept="image/png,image/jpeg" ref={ref} onChange={onFileChange} style={{display:"none"}}/>
            <img src={isCroppedImg||require("../../../../../public/img/DefaultMusicPicture.jpg")}/>
            <button onClick={()=> ref?.current?.click()}>Change img</button>
            <Modal visible={isCropModal} setVisible={setCropModal}><ImgCrop src={isLoadedImg} setCropped={cropped}/></Modal>
        </div>
    </div>
  )
}
