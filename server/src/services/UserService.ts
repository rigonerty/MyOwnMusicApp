import * as path from 'path';
import fs from "fs"
import bcrypt from "bcryptjs"
import ApiError from "../exceptions/api-error";
import TokenService from "./TokenService";
import { saveImg } from './helpers/getFile';
import { IUser } from './types';
interface updateUser{
    id:number;
    img:string;
    name: string;
    oldPassword: string;
    newPassword: string;
    email:string;
    theme: "white"|"black";
    language:"english"|"russian"
}
interface IFavorite{
    id:number;
    fav: {type:"album"|"music"|"playlist",id:number}[];
}


const findUser = (name?:string, email?:string, id?:number)=>{
    const users:IUser[] = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../api/user/user.json")).toString())
    let user = null;
    if(name && email ) user = users.find(a=>a.name === name || a.email===email)
    if(id) user = users.find(a=>a.id == id)
    return {user,users}
}


class UserService{
    async update(data:updateUser){
        const {id,name,email,oldPassword, img, newPassword, language,theme} = data
        const {user,users} = findUser("","", id)
        if(!user){
            throw ApiError.BadRequest("Пользователь не найден.")
        } 
        user.name = name;
        user.email = email;
        user.theme = theme;
        user.language = language;
        if(oldPassword && newPassword){
            if(oldPassword===newPassword) throw ApiError.BadRequest("Пароли не могут быть одинаковыми.")
            const valid = bcrypt.compareSync(oldPassword, user.password)
            if(!valid){
                throw ApiError.BadRequest("Парой не верен.")
            }
            const password = bcrypt.hashSync(newPassword)
            user.password = password;
        }
        if(img){ saveImg(id,img,"avatar") }
        fs.writeFileSync(path.resolve(__dirname, "../api/user/user.json"), JSON.stringify(users))
        return {name,email, language,theme, id}
    }
    async favorite(data:IFavorite){
        const {id,fav} = data
        const {user, users} = findUser("","", id)
        if(!user) throw ApiError.BadRequest("Пользователь не найден.")
        user.fav = fav;
        fs.writeFileSync(path.resolve(__dirname, "../api/user/user.json"), JSON.stringify(users))
        return {fav}
    }

}
export default new UserService()