import { NextFunction,Request,Response } from "express";
import MusicService from "../services/MusicService";



class MusicController{
    async getMusicById(req:Request,res:Response,next:NextFunction){
        try{
            const {id} = req.params
            const resData = await MusicService.getMusicById(+id)
            return res.json(resData)
        }catch(e){
            next(e)
        }
    }
    async getAllMusicByUserId(req:Request,res:Response,next:NextFunction){
        try{
            const {id} = req.params
            const resData = await MusicService.getAllMusicByUserId(+id)
            return res.json(resData)
        }catch(e){
            next(e)
        }
    }
    async addMusic(req:Request,res:Response,next:NextFunction){
        try{
            const resData = await MusicService.addMusic(req.body)
            return res.json(resData)
        }catch(e){
            next(e)
        }
    }
    async updateMusic(req:Request,res:Response,next:NextFunction){
        try{
            const resData = await MusicService.updateMusic(req.body)
            return res.json(resData)
        }catch(e){
            next(e)
        }
    }
    async deleteMusic(req:Request,res:Response,next:NextFunction){
        try{
            const {id} = req.params
            const resData = await MusicService.deleteMusic(+id)
            return res.json(resData)
        }catch(e){
            next(e)
        }
    }
}

export default new MusicController()