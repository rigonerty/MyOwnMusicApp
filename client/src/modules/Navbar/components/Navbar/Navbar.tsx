import React from 'react'
import { Link } from 'react-router-dom'
import { LinkNav } from '../../../../components/LinkNav/LinkNav'
import cl from "./Navbar.module.scss"
import { Auth } from '../Auth/Auth'
export const Navbar = () => {
  return (
    <div className={cl.Navbar}>
      <div className={cl.main}>
        <LinkNav to='/' url={require("../../../../../public/img/216242_home_icon.svg")} text='To home' left/>
        <LinkNav to='/favorite' url={require("../../../../../public/img/211755_heart_icon.svg")} text='To favorite' left/>
        <LinkNav to='/settings' url={require("../../../../../public/img/326699_settings_icon.svg")} text='To setting' left/>        
      </div>
      <Auth/>
    </div>
  )
}
