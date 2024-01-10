import React from 'react'
import cl from "./Input.module.scss"
interface props{
    isValue: string;
    setValue: (smth:string)=>void;
    placeholder: string;
    name: string;
    style?: {};
}

export const Input = ({isValue,setValue,name,placeholder, style={}}:props) => {
  return (
    <label className={cl.Input}>
        {name}
        <input value={isValue} onChange={(e)=>setValue(e.target.value)} placeholder={placeholder} style={style}/>
    </label>
  )
}
