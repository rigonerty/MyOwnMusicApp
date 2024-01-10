import React, { useState } from 'react'
import cl from "./ChangeInfo.module.scss"
import { appUseSelector } from '../../../../hooks/reduxHooks'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IFormChange } from '../../types/form'
import { InputForm } from '../../../../components/InputForm/InputForm'
import { IoFlashOutline } from 'react-icons/io5'

interface props{
  onSubmit: SubmitHandler<IFormChange>
}


export const ChangeInfo = ({onSubmit}:props) => {
  const {register,handleSubmit,formState:{errors},watch,setError} = useForm<IFormChange>({mode:"onChange"})
  const user = appUseSelector(state=>state.user)
  return (
    <div className={cl.ChangeInfo}>
      <form onSubmit={handleSubmit(onSubmit)} id='changeUserInfo'>
          <InputForm label="Name" name="name" errors={errors} register={register("name", {
                required: false,
                maxLength:20,
                minLength:4,
                value: user.name })}/>
          <InputForm label="Email" name="email" errors={errors} register={register("email", {
              required: false,
              pattern:{
                value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message:"Please enter valid email"
              },
              maxLength:40,
              minLength:4,
              value: user.email})}/>
          <InputForm secureTextEntry label="Old password" name='oldPassword' errors={errors} register={register("oldPassword",{
            required:false,
            maxLength:30,
            minLength:8
          })}/>
          <InputForm secureTextEntry label="New password" name='newPassword' errors={errors} register={register("newPassword",{
            required:false,
            maxLength:30,
            minLength:8,
            validate: (val:string)=>{
              if(watch("oldPassword")===val && val) return "Your new password same as old!"
            }
          })}/>
      </form>
    </div>
  )
}
