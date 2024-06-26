import React, { useEffect, useState } from 'react'
import { FieldErrors } from 'react-hook-form'
import cl from "./InputFrom.module.scss"
interface props{
  errors: any;
  name:string;
  register: any;
  label:string;
  secureTextEntry?:boolean;
  placeholder?:string;
}


export const InputForm = ({errors, register,name,label,secureTextEntry=false, placeholder=""}:props) => {
  const cls = [cl.InputForm]
  const [isVisible,setVisible] = useState(secureTextEntry?true:false)
  if(errors[name]) cls.push(cl.InputFormError)
  return (
    <div className={cls.join(" ")}>
        <label htmlFor={`InputFrom.${name}`}>
          <p>{label}</p>
          <input {...register} id={`InputFrom.${name}`} type={isVisible?"password":"text"} placeholder={placeholder}/>
          {secureTextEntry&&<i onClick={()=>setVisible(prev=>!prev)} tabIndex={0}>
            {
              isVisible
                ?<img src={require("../../../public/img/9110850_eye_icon.svg")} alt="" />
                :<img src={require("../../../public/img/8530588_eye_slash_icon.svg")} alt="" />
            }
            
          </i>}
        </label> 
        <div>
          {errors[name]&&
            <>
              {errors[name]?.type ==="required"?<span> This field is required!</span>:""}
              {errors[name]?.type ==="maxLength"?<span> Max length exceeded! </span>:""}
              {errors[name]?.type ==="minLength"
                ?<span> Min length is not reached! </span>
                :<span> {errors[name]?.message} </span>}
            </>
          }

        </div>
    </div>
  )
}
