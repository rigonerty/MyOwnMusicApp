import React,{useState} from 'react'
import { ChangeImg } from '../ChangeImg/ChangeImg'
import cl from "./ChangeUser.module.scss"
import { ChangeInfo } from '../ChangeInfo/ChangeInfo'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IFormChange } from '../../types/form'
import { useUpdateMutation } from '../../../../store/api/userApi'
import { appUseDispatch, appUseSelector } from '../../../../hooks/reduxHooks'
import { setUser } from '../../../../store/slices/user/user'
export const ChangeUser = () => {
  const [isImage, setImage] = useState("")
  const [send,{data, error}] = useUpdateMutation()
  const {id, theme,language,fav} = appUseSelector(state=>state.user)
  const dispatch = appUseDispatch()
  const saveChanges:SubmitHandler<IFormChange> = (data)=>{
    const {name,email,oldPassword,newPassword} = data
    send({id, name,email,oldPassword,newPassword, img:isImage,theme,language})
  }
  if(data&&!error){
    dispatch(setUser({id,theme,language, img:isImage, name:data.name, email:data.email, fav}))
  }

  return (
    <div className={cl.ChangeUser}>
        <div>
            <ChangeImg setNewAvatar={setImage}/>
            <ChangeInfo onSubmit={saveChanges}/>
        </div>
        <button type="submit" form="changeUserInfo">Save changes</button>
    </div>
  )
}
