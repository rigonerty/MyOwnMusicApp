import { NextFunction, Request, Response } from "express"
import AuthService from "../services/AuthService"



class AuthController {
    async login(req:Request,res:Response,next:NextFunction){
        try{
            const reqData = req.body
            const resData = await AuthService.login(reqData)
            res.cookie("refreshToken", resData.refreshToken, {maxAge: 240*60*60*1000, httpOnly:true})
            return res.json(resData)
        } catch(e){ next(e) }
    }
    async register(req:Request,res:Response,next:NextFunction){
        try{
            const reqData = req.body
            const resData = await AuthService.register(reqData)
            res.cookie("refreshToken", resData.refreshToken, {maxAge:240*60*60*1000, httpOnly: true})
            return res.json(resData)
        }catch(e){next(e)}
    }
    async loguot(req:Request,res:Response,next:NextFunction){
        try{
            const {refreshToken} = req.cookies
            await AuthService.logout(refreshToken)
            res.clearCookie("refreshToken")
            return res.status(200)
        }catch(e){next(e)}
    }
    async refresh(req:Request,res:Response,next:NextFunction){
        try{
            const {refreshToken} = req.cookies
            const resData = await AuthService.refresh(refreshToken)
            res.cookie("refreshToken", resData.refreshToken, {maxAge: 240*60*60*1000, httpOnly:true})
            return res.json(resData)
        }catch(e){next(e)}
    }
}

export default new AuthController()