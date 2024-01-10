import { NextFunction,Request,Response } from "express";
import AuthorService from "../services/AuthorService";

class AuthorController{
    async getAuthorById(req:Request,res:Response,next:NextFunction){
        try{
            const {id} = req.params
            const resData = await AuthorService.getAuthorById(+id)
            return res.json(resData)
        }catch(e){
            next(e)
        }
    }
    async getAllAuthors(req:Request,res:Response,next:NextFunction){
        try{
            const resData = await AuthorService.getAllAuthors()
            return res.json(resData)
        }catch(e){
            next(e)
        }
    }
    async createAuthor(req:Request,res:Response,next:NextFunction){
        try{
            const resData = await AuthorService.createAuthor(req.body)
            return res.json(resData)
        }catch(e){
            next(e)
        }
    }
    async updateAuthor(req:Request,res:Response,next:NextFunction){
        try{
            const resData = await AuthorService.updateAuthor(req.body)
            return res.json(resData)
        }catch(e){
            next(e)
        }
    }
    async deleteAuthor(req:Request,res:Response,next:NextFunction){
        try{
            const {id} = req.params
            const resData = await AuthorService.deleteAuthor(+id)
            return res.json(resData)
        }catch(e){
            next(e)
        }
    }
}

export default new AuthorController()