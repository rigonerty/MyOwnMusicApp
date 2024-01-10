import * as path from 'path';
import fs from "fs"
import ApiError from '../../exceptions/api-error';
import { json } from 'stream/consumers';
import { IAlbum, IAuthor, IUser } from '../types';

export const getImg = (id:number, type:"album"|"music"|"playlist"|"avatar")=>{
    let img = ""
    if(type==="avatar"){
        if(fs.existsSync(path.resolve(__dirname, "../../api/user/files/", id +".jpg"))){
            img = "data:image/jpg;base64," + fs.readFileSync(path.resolve(__dirname, "../../api/user/files/", id +".jpg")).toString("base64")
        }        
    }
    else {
        if(fs.existsSync(path.resolve(__dirname, "../../api/music/files/"+type+"Img", id +".jpg"))){
            img = "data:image/jpg;base64," + fs.readFileSync(path.resolve(__dirname, "../../api/music/files/"+type+"Img", id +".jpg")).toString("base64")
        }
    }

    return img
}
export const saveImg = (id:number, img:string, type: "music"|"album"|"playlist"|"avatar")=>{
    const valid = img.slice(9,18)
    if(!valid.search(/jpeg|png|jpg|webp/)){
        throw ApiError.BadRequest("Тип файла не поддерживается.")
    }
    const format = valid.match(/jpeg|png|jpg|webp/)||["jpeg"]
    const image = img.replace("data:image/"+format[0]+";base64,", "")
    if(type==='avatar') fs.writeFileSync(path.resolve(__dirname, "../../api/user/files/"+id+".jpg"), image, "base64")
    else fs.writeFileSync(path.resolve(__dirname, "../../api/music/files/"+type+"Img/"+ id+".jpg"), image, "base64")
}


export const saveSongToAuthor = (authorId:number,musicId:number)=>{
    const authors:IAuthor[] = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../../api/music/author.json")).toString())
    const needed = authors.find(a=>a.id===authorId)
    if(needed) needed.music.push(musicId)
    saveAuthors(authors)
}

export const saveSongToAlbum = (albumId:number, musicId:number)=>{
    const albums:IAlbum[] = JSON.parse(fs.readFileSync(path.resolve(__dirname,"../../api/music/album.json")).toString())
    const needed = albums.find(a=>a.id===albumId)
    if(needed) needed.music.push(musicId)
    saveAlbums(albums)
}

export const saveSongToUser = (userId:number,musicId:number)=>{
    const users:IUser[] = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../../api/user/user.json")).toString())
    const needed = users.find(a=>a.id===userId)
    if(needed) needed.music.push(musicId)
    saveUsers(users)
}

export const saveAuthors = (arr:IAuthor[])=>{
    fs.writeFileSync(path.resolve(__dirname, "../../api/music/author.json"), JSON.stringify(arr))
}

export const saveAlbums = (arr:IAlbum[])=>{
    fs.writeFileSync(path.resolve(__dirname,"../../api/music/album.json"), JSON.stringify(arr))
}
export const saveUsers = (arr:IUser[])=>{
    fs.writeFileSync(path.resolve(__dirname, "../../api/user/user.json"), JSON.stringify(arr))
}