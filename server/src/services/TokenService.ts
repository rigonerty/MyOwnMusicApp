import jwt from "jsonwebtoken"
import TOKEN from "../config"
import fs from "fs"
import * as path from 'path';

interface token{
    id:number;
    token: string;
}

class TokenService{
    generateToken(payload:any){
        const refreshToken = jwt.sign(payload, TOKEN.secretRefreshToken, {expiresIn: "10d"})
        const accessToken = jwt.sign(payload, TOKEN.secretAccessToken, {expiresIn: "1h"})
        return {refreshToken, accessToken}
    }
    validRefreshToken(token:string){
        try{
            const userData = jwt.verify(token, TOKEN.secretRefreshToken)
            return userData
        }catch(e){
            return null
        }
    }
    validAccessToken(token:string){
        try{
            const userData = jwt.verify(token, TOKEN.secretAccessToken)
            return userData
        }catch(e){
            return null
        }
    }
    async saveToken(userId:number, refreshToken:string){
        const tokens:token[] = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../api/user/token.json")).toString())
        const existToken = tokens.find(a=>a.id=== userId)
        if(existToken) existToken.token = refreshToken
        if(!existToken) tokens.push({id:userId, token:refreshToken})
        fs.writeFileSync(path.resolve(__dirname, "../api/user/token.json"), JSON.stringify(tokens))
    }
    async deleteToken(refreshToken:string){
        const tokens:token[] = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../api/user/token.json")).toString())
        const newArrOfTokens = tokens.filter(a=>a.token !== refreshToken)
        fs.writeFileSync(path.resolve(__dirname, "../api/user/token.json"), JSON.stringify(newArrOfTokens))
    }
    async findToken(refreshToken:string){
        const tokens:token[] = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../api/user/token.json")).toString())
        const existToken = tokens.find(a=>a.token === refreshToken)
        if(existToken) return existToken
        return null
    }
}

export default new TokenService()