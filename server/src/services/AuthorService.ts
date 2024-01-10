import * as path from 'path';
import fs from "fs"
import ApiError from "../exceptions/api-error";
import { IAuthor } from './types';
import { saveAuthors } from './helpers/getFile';
interface data{
    name: string;
    music: number[];
    id:number
}

const getAllAuthorsFromDB = ()=>{
    const authors:IAuthor[] = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../api/music/author.json")).toString())
    return authors
}

const getAuthor = (id:number)=>{
    const authors:IAuthor[] = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../api/music/author.json")).toString())
    const neededAuthor = authors.find(a=>a.id === id)
    return neededAuthor
}


class AuthController{
    async getAuthorById(id:number){
        const author = getAuthor(id)
        if(!author) throw ApiError.BadRequest("Автор не был найден.")
        return author
    }
    async getAllAuthors(){
        return getAllAuthorsFromDB()
    }
    async createAuthor(data:data){
        const authors = getAllAuthorsFromDB()
        const {name,music} = data
        const id = Math.round(Math.random()*1000000000000)
        authors.push({name, music,id})
        saveAuthors(authors)
        return {name, music,id}
    }
    async updateAuthor(data:data){
        const authors = getAllAuthorsFromDB()
        const {name,music, id} = data
        const neededAuthor = authors.find(a=>a.id === id)
        if(!neededAuthor) throw ApiError.BadRequest("Автор не найден.")
        neededAuthor.name = name;
        neededAuthor.music = music;
        saveAuthors(authors)
        return neededAuthor
    }
    async deleteAuthor(id:number){
        const authors = getAllAuthorsFromDB()
        const newArr = authors.filter(a=>a.id !== id)
        saveAuthors(newArr)
        return newArr
    }
}

export default new AuthController()