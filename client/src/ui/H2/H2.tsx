import React from 'react'
import cl from "./H2.module.scss"
interface props{
    text: string;
}
export const H2 = ({text}:props) => {
  return (
    <h2 className={cl.H2}>{text}<span>{text}</span></h2>
  )
}
