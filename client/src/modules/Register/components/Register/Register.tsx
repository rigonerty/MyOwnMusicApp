import { useNavigate } from "react-router-dom"
import cl from "./Register.module.scss"
import { H2 } from '../../../../ui/H2/H2'
import {useForm, SubmitHandler} from "react-hook-form"
import { registerForm } from '../../types/interfaces'
import { InputForm } from '../InputForm/InputForm'
import { useRegisterMutation } from '../../../../store/api/authApi'
import { appUseDispatch } from '../../../../hooks/reduxHooks'
import { setUser } from '../../../../store/slices/user/user'
import { useEffect } from "react"
export const Register = () => {
  const {register,handleSubmit,formState:{errors},reset,watch,setError} = useForm<registerForm>({mode:"onChange"})
  const [sendRequest, {data,error}] = useRegisterMutation()
  const dispatch = appUseDispatch()
  const navigate = useNavigate()
  const onSubmit:SubmitHandler<registerForm> = (inputData)=>{
    const {name,email,password} = inputData
    sendRequest({name,email,password})
  }
  useEffect(()=>{
    if(error && "status" in error){
      const formError = { type: "server", message: "Пользователь с таким именем или почтой уже существует." }
      setError("name", formError)
    }
  },[error])

  if(data) {
    reset()
    localStorage.setItem("token", data.accessToken)
    dispatch(setUser(data.user))
    navigate("/")
  }
  return (
    <div className={cl.Register}>
        <H2 text='Register'/>
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
                <InputForm secureTextEntry label="Confirm password" name='confirmPassword' errors={errors} register={register("confirmPassword",{
                  required:true,
                  maxLength:30,
                  minLength:8,
                  validate: (val:string)=>{
                    if(watch("password")!==val) return "Your Password do not match!"
                  }
                })}/>
           <input type='submit'/> 
        </form>
        
    </div>
  )
}
