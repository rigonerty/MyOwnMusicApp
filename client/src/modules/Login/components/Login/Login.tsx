import { useNavigate } from "react-router-dom"
import cl from "./Login.module.scss"
import { H2 } from '../../../../ui/H2/H2'
import {useForm, SubmitHandler} from "react-hook-form"
import { registerForm } from '../../types/interfaces'
import { InputForm } from '../InputForm/InputForm'
import { useLoginMutation } from '../../../../store/api/authApi'
import { appUseDispatch } from '../../../../hooks/reduxHooks'
import { setUser } from '../../../../store/slices/user/user'
import { useEffect } from "react"
export const Login = () => {
  const [sendRequest,{data,error}] = useLoginMutation()
  const {register,handleSubmit,formState:{errors},reset,setError} = useForm<registerForm>({mode:"onChange"})
  const dispatch = appUseDispatch()
  const navigate = useNavigate()
  const onSubmit:SubmitHandler<registerForm> = (inputData)=>{
    const {name,email,password} = inputData
    sendRequest({name,email,password})
  }
  useEffect(()=>{
    if(error && "status" in error){
      const formState= {type:"server", message:"Имя пользователя, почта или пароль введены не верно."}
      setError("name",formState)
    }
  },[error])
  if(data && !error){
    reset()
    localStorage.setItem("token", data.accessToken)
    dispatch(setUser(data.user))
    navigate("/")
  }
  return (
    <div className={cl.Register}>
        <H2 text='Login'/>
        <form onSubmit={handleSubmit(onSubmit)}>
            <InputForm label="Name" name="name" errors={errors} register={register("name", {
                required: true,
                maxLength:20,
                minLength:4})}/>
            <InputForm label="Email" name="email" errors={errors} register={register("email", {
                required: true,
                pattern:{
                  value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message:"Please enter valid email"
                },
                maxLength:40,
                minLength:4})}/>
                <InputForm secureTextEntry label="Password" name='password' errors={errors} register={register("password",{
                  required:true,
                  maxLength:30,
                  minLength:8
                })}/>
           <input type='submit'/> 
        </form>
        
    </div>
  )
}
