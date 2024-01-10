import React, { useEffect, useRef } from 'react'
import cl from "./Select.module.scss"
interface props {
    isValue: {title:string; value:string};
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    isVisible: boolean;
}

export const SelectHeader = ({isValue,setVisible, isVisible}:props) => {
    const placeholderRef = useRef<HTMLDivElement>(null)
    useEffect(()=>{
        const placeholderEl = placeholderRef.current
        if(!placeholderEl) return
        const handleClick = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            setVisible((prev:boolean) => !prev);
        }
        };

        placeholderEl.addEventListener('keydown', handleClick);

        return () => {
            placeholderEl.removeEventListener('keydown', handleClick);
        };
    },[])
  return (
    <div tabIndex={0} ref={placeholderRef} onClick={()=> setVisible(prev=>!prev)} className={isVisible?cl.active:""}>
        <p>
          {isValue?.title||""}
        </p>
        <img src={require("../../../public/img/3994400_arrow_forward_navigation_next_right_icon.svg")} alt="" />      
    </div>
  )
}
