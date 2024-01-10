import React, { useState } from 'react'
import { Register } from '../../../modules/Register'
import cl from "./RegisterPage.module.scss"
import { Login } from '../../../modules/Login'
export const RegisterPage = () => {
  const [isComeIn,setComeIn] = useState(false)
  return (
    <div className={cl.RegisterPage}>
        {isComeIn
        ?<Login/>
        :<Register/>
        }
        <button onClick={()=>setComeIn(prev=>!prev)}>{isComeIn?"Register":"Login"}</button>
    </div>
  )
}
