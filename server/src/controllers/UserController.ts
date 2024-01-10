import { NextFunction, Request, Response } from "express"
import UserService from "../services/UserService"



class UserController {
    async update(req:Request,res:Response,next:NextFunction){
        try{
            const reqData = req.body
            const resData = await UserService.update(reqData)
            return res.json(resData)
        } catch(e){ next(e) }
    }
    async favorite(req:Request,res:Response,next:NextFunction){
        try{
            const reqData = req.body
            const resData = await UserService.favorite(reqData)
            return res.json(resData)
        }catch(e){next(e)}
    }
}

export default new UserController()