import React from 'react'
import cl from "./LogoutBtn.module.scss"
import { useLogoutMutation } from '../../../../store/api/authApi'
import { appUseDispatch } from '../../../../hooks/reduxHooks'
import { logout } from '../../../../store/slices/user/user'
import { useNavigate } from 'react-router-dom'
export const LogoutBtn = () => {
    const [sendRequest] = useLogoutMutation()
    const navigate = useNavigate()
    const dispatch = appUseDispatch()
    const onClick = ()=>{
        sendRequest()
        navigate("/register")
        localStorage.removeItem("token")
        dispatch(logout())
    }
  return (
    <button className={cl.LogoutBtn} onClick={onClick}>Logout</button>
  )
}
