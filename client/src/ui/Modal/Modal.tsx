import React from 'react'
import cl from "./Modal.module.scss"
interface props{
    children: React.ReactNode,
    visible: boolean|null|any,
    setVisible: (vis:null|any)=>void
}
export const Modal = ({children,visible,setVisible}:props) => {
    const clx = [cl.ModalBack]
    if(visible){
        clx.push(cl.active)
    }
  return (
    <div onClick={()=> setVisible(null)} className={clx.join(" ")}>
        <div onClick={(e)=> e.stopPropagation()} className={cl.ModalContent}>
            <button onClick={()=> setVisible(null)}>×</button>
            {children}
        </div>
    </div>
  )
}
