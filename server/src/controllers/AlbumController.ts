import { NextFunction,Request,Response } from "express";
import AlbumService from "../services/AlbumService";

class AlbumController{
    async getAlbumById(req:Request,res:Response,next:NextFunction){
        try{
            const {id} = req.params
            const resData = await AlbumService.getAlbumById(+id)
            return res.json(resData)
        }catch(e){
            next(e)
        }
    }
    async getAllAlbumsOfAuthor(req:Request,res:Response,next:NextFunction){
        try{
            const {id} = req.params
            const resData = await AlbumService.getAllAlbumsOfAuthor(+id)
            return res.json(resData)
        }catch(e){
            next(e)
        }
    }
    async createAlbum(req:Request,res:Response,next:NextFunction){
        try{
            const resData = await AlbumService.createAlbum(req.body)
            return res.json(resData)
        }catch(e){
            next(e)
        }
    }
    async updateAlbum(req:Request,res:Response,next:NextFunction){
        try{
            const resData = await AlbumService.updateAlbum(req.body)
            return res.json(resData)
        }catch(e){
            next(e)
        }
    }
    async deleteAlbum(req:Request,res:Response,next:NextFunction){
        try{
            const {id} = req.params
            const resData = await AlbumService.deleteAlbum(+id)
            return res.json(resData)
        }catch(e){
            next(e)
        }
    }
}

export default new AlbumController()