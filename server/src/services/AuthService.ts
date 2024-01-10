import * as path from 'path';
import fs from "fs"
import bcrypt from "bcryptjs"
import ApiError from "../exceptions/api-error";
import TokenService from "./TokenService";
import { getImg } from './helpers/getFile';

interface loginAndRegister{
    name: string;
    password: string;
    email:string;
}
interface user{
    name: string;
    email:string;
    password:string;
    id:number;
    music: number[];
    fav:{type:"album"|"music"|"playlist",id:number}[];
    language:"english"|"russian";
    theme:"white"|"black"
}


const findUser = (name?:string, email?:string, id?:number)=>{
    const users:user[] = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../api/user/user.json")).toString())
    let user = null;
    if(name && email ) user = users.find(a=>a.name === name || a.email===email)
    if(id) user = users.find(a=>a.id == id)
    return {user,users}
}


class AuthService{
    async login(data:loginAndRegister){
        const {user} = findUser(data.name, data.email)
        if(!user) throw ApiError.BadRequest("Пользователь не найден.") 
        if(user.name !== data.name || user.email !== data.email) throw ApiError.BadRequest("Неверно введены имя или пароль.")
        const validPassword = bcrypt.compareSync(data.password, user.password)
        if(!validPassword) throw ApiError.BadRequest("Неверно введены имя или пароль.")
        const tokens = TokenService.generateToken({id:user.id,email:user.email})
        const {id,email,name,music,language,fav,theme} = user
        await TokenService.saveToken(user.id, tokens.refreshToken)
        const img = getImg(id,"avatar")
        return {...tokens, user:{id,email,name, music, language,fav,theme, img}}
    }
    async register(data:loginAndRegister){
        const {user,users} = findUser(data.name, data.email)
        if(user) throw ApiError.BadRequest("Пользователь с таким именем или почтой уже существует.")
        const hashPassword = bcrypt.hashSync(data.password,7)
        const id = Math.round(Math.random()*1000000000000)
        const music = [880748298115, 867638813118, 806481277120, 248211945505, 577950516515, 407307066480, 541939426620, 507120285207, 309746506707, 377172879194, 603698885424, 595765903529, 311617911899]
        const userData:user = {id, name: data.name, email:data.email, password:hashPassword, music, language:"english",theme:"white", fav:[]} 
        users.push(userData)
        fs.writeFileSync(path.resolve(__dirname, "../api/user/user.json"), JSON.stringify(users))

        const tokens = TokenService.generateToken({id,email:data.email}) 
        await TokenService.saveToken(id,tokens.refreshToken)
        return {...tokens, user:{id,name:data.name, email:data.email,music,language:"english",theme:"white", fav:[]}}
    }
    async logout(token:string){
        await TokenService.deleteToken(token)
    }
    async refresh(token:string){
        if(!token) throw ApiError.UnAuthorizedError()
        const validToken = TokenService.validRefreshToken(token)
        const existToken = await TokenService.findToken(token) 
        if(!validToken || !existToken) throw ApiError.UnAuthorizedError()
        const {user} = findUser("","", existToken.id)
        if(!user) throw ApiError.BadRequest("Пользователь не найден.")
        const newTokens = TokenService.generateToken({id:user.id, email:user?.email})
        await TokenService.saveToken(user.id, newTokens.refreshToken)
        const {id,email,name,music,language,fav,theme} = user;
        const img = getImg(id,"avatar")
        return {...newTokens, user:{id,email,name, music, language,fav,theme, img}}
    }
}
export default new AuthService()