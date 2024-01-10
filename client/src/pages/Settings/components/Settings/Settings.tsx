import React from 'react'
import { ChangeUI } from '../../../../modules/ChangeUI'
import { ChangeUser } from '../../../../modules/ChangeUser'
import { H2 } from '../../../../ui/H2/H2'
import cl from "./Settings.module.scss"
export const Settings = () => {
  return (
    <div className={cl.Settings}>
      <H2 text='Settings'/>
      <ChangeUser/>
      <ChangeUI/>
    </div>
  )
}
