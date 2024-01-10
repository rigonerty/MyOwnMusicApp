import { NextFunction,Request,Response } from "express";
import PlaylistService from "../services/PlaylistService";

class AlbumController{
    async getPlaylistById(req:Request,res:Response,next:NextFunction){
        try{
            const {id} = req.params
            const resData = await PlaylistService.getPlaylistById(+id)
            return res.json(resData)
        }catch(e){
            next(e)
        }
    }
    async getAllPlaylistsOfAuthor(req:Request,res:Response,next:NextFunction){
        try{
            const {id} = req.params
            const resData = await PlaylistService.getAllPlaylistsOfAuthor(+id)
            return res.json(resData)
        }catch(e){
            next(e)
        }
    }
    async createPlaylist(req:Request,res:Response,next:NextFunction){
        try{
            const resData = await PlaylistService.createPlaylist(req.body)
            return res.json(resData)
        }catch(e){
            next(e)
        }
    }
    async updatePlaylist(req:Request,res:Response,next:NextFunction){
        try{
            const resData = await PlaylistService.updatePlaylist(req.body)
            return res.json(resData)
        }catch(e){
            next(e)
        }
    }
    async deletePlaylist(req:Request,res:Response,next:NextFunction){
        try{
            const {id} = req.params
            const resData = await PlaylistService.deletePlaylist(+id)
            return res.json(resData)
        }catch(e){
            next(e)
        }
    }
}

export default new AlbumController()