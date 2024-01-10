import React from 'react'
import cl from "./ChangeView.module.scss"
import { AddSong } from '../AddSong/AddSong';
interface props{
  isType: "block"|"line";
  setType: (smth:"block"|"line")=>void
}
export const ChangeView = ({isType,setType}:props) => {
  return (
    <div className={cl.ChangeView}>
      <AddSong/>
      <div className={cl.ChangeViewContent}>
        <div className={isType==="block"?cl.block:cl.line} ></div>
        <button onClick={()=>setType("block")}>
            <img src={require("../../../../../public/img/1564493_interface_display_blocks_icon.svg")} alt="" />
        </button>
        <button onClick={()=>setType("line")}>
            <img src={require("../../../../../public/img/134216_menu_lines_hamburger_icon.svg")} alt="" />
        </button>        
      </div>
    </div>
  )
}
