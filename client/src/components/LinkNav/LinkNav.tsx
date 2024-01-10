import React from 'react'
import cl from "./LinkNav.module.scss"
import { Link } from 'react-router-dom';
interface props{
    text:string;
    url: string;
    to: string;
    left?: boolean;
}

export const LinkNav = ({text,url,to, left=false}:props) => {
  return (
    <Link to={to} className={cl.NavLink}>
        {left && <div className={cl.left}>{text}</div>}
        <img src={url}/>
        {!left && <div className={cl.right}>{text}</div>}
    </Link>
  )
}
