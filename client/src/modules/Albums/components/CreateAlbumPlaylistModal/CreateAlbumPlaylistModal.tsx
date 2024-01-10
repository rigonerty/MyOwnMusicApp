import React, { useEffect, useRef, useState } from 'react'
import { Modal } from '../../../../ui/Modal/Modal'
import { Input } from '../../../../ui/Input/Input';
import { Select } from '../../../../ui/Select/Select';
import cl from "./CreateAlbumPlaylistModal.module.scss"
import { SelectAuthor } from '../../../../components/SelectAuthor/SelectAuthor';
interface ICreateFun{
  name:string;
  author: number;
}

interface props{
    isVisible: null|true;
    setVisible:(smth:props["isVisible"])=>void;
    create: (smth:ICreateFun)=>void;
    authors: {title:string; value:string}[];
    onFileChange: React.ChangeEventHandler<HTMLInputElement>;
    children: React.ReactNode;
    isCroppedImg: string;
    isSelectValue: {title:string; value:string};
    setSelectValue: (smth:{title:string; value:string})=>void;
    createAuthor: (smth:string)=>void;
}

export const CreateAlbumPlaylistModal = ({isVisible,setVisible,create,authors, onFileChange,isCroppedImg,children,isSelectValue, setSelectValue, createAuthor}:props) => {
  const ref = useRef<HTMLInputElement>(null)
  const [isInputValue,setInputValue] = useState("")
  const onCreateHandler = ()=>{
    create({name:isInputValue,author:+isSelectValue.value})
  }
  return (
    <Modal visible={isVisible} setVisible={setVisible}>
        <div className={cl.CreateAlbumPlaylistModal}>
            <div className={cl.Data}>
              <div className={cl.Img}>
                <button onClick={()=>ref?.current?.click()}>
                  Change img
                </button>
                <input type='file' ref={ref} accept="image/png,image/jpeg" style={{display:"none"}} onChange={onFileChange}/>
                <img alt='Image for album or playlist.' 
                  src={isCroppedImg||require("../../../../../public/img/DefaultPicture.jpg")}/>                
              </div>
              <div className={cl.Info}>
                <Input isValue={isInputValue} setValue={setInputValue} placeholder='Name' name='Name'style={{border:"1px solid gray"}}/>
                <p>Author:</p> 
                <SelectAuthor isSelectValue={isSelectValue} setSelectValue={setSelectValue} authors={authors} createAuthor={createAuthor}/>
              </div>
            </div>
            <div className={cl.musicList}>
              {children}
            </div>
            <button onClick={onCreateHandler}>Create</button>
        </div>
    </Modal>
  )
}
