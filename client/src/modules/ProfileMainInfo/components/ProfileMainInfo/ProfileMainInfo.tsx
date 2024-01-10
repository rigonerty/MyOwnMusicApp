import React from 'react'
import { H2 } from '../../../../ui/H2/H2'
import cl from "./ProfileMainInfo.module.scss"
import { LogoutBtn } from '../LogoutBtn/LogoutBtn'
import { appUseSelector } from '../../../../hooks/reduxHooks'
export const ProfileMainInfo = () => {
  const {img} = appUseSelector(state=>state.user)
  return (
    <div className={cl.ProfileMainInfo}>
      <div>
        <img src={img||require("../../../../../public/img/avatar.jpg")} alt="" />
        <div>
            <H2 text='rigonerty'/>
        </div>        
      </div>
      <LogoutBtn/>
    </div>
  )
}
