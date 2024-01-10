import React, { useState } from 'react'
import { Modal } from '../../ui/Modal/Modal'
import cl from "./AlbumModal.module.scss"
import { IoHeartOutline, IoHeartSharp } from 'react-icons/io5'

interface props{
    pack:{
        img:string;
        name: string;
        description?:string;
        music: number[]
    };
    play: ()=> void;
    edit: ()=> void;
    deleteAlbum: ()=> void;
    isVisible: null|true;
    setVisible: (smth:null|true)=>void;
    children: React.ReactNode ;
    setFav: ()=>void;
    isFav: boolean;
}

export const AlbumModal = ({pack,play,edit, deleteAlbum, isVisible,setVisible,children, setFav,isFav}:props) => {
  return (
    <Modal visible={isVisible} setVisible={setVisible}>
        <div className={cl.AlbumModal}>
            <div>
                <img src={pack.img} alt="Image for album"/>
                <div>
                    <button className={cl.AlbumPlay} onClick={play}>▶ Play</button>
                    <button onClick={edit}>Edit</button>
                    |
                    <button onClick={deleteAlbum}>Delete</button>            
                </div>            
            </div>
            <div>
                <div className={cl.Info}>
                    <h3>
                        {pack.name}
                        <button onClick={setFav}>{isFav?<IoHeartSharp size={"1.5em"} cursor={"pointer"}/>:<IoHeartOutline size={"1.5em"} cursor={"pointer"}/>}</button>
                    </h3>
                    <p>{pack.description||""}</p>
                </div>
                <div className={cl.List}>
                    {children}
                </div>                
            </div>
        </div>
    </Modal>
  )
}
