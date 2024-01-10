import React from 'react'
import { Routes, Route, Navigate} from 'react-router-dom'
import { isAuthRouter} from './router'
export const AppRouter = () => {
  return (
        <Routes>
            {
              isAuthRouter.map((a)=>{
                    return <Route path={a.path} element={a.component} key={a.path}/>
                })              
            }        
        </Routes>
  )
}
