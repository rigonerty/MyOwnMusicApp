import * as path from 'path';
import fs from "fs"
import ApiError from "../exceptions/api-error";
import { getImg, saveImg, saveSongToAlbum, saveSongToAuthor, saveSongToUser } from './helpers/getFile';

interface addAndUpdate{
    name: string;
    author: number;
    album: number;
    id:number;
    img:string;
    userId:number;
    music: string;
}
interface music{
  name: string;
  author: number;
  id:number;
  album: number;
}
const getMusicDB = ()=>{
    const music:music[] = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../api/music/music.json")).toString())
    return music
}

const saveAudio = (music: string, id:number)=>{
    const valid = music.slice(9,18)
    const format = valid.match(/mpeg|MPA/)
    if(!format) throw ApiError.BadRequest("Тип файла не поддерживается.")
    const audio = music.replace("data:audio/"+ format[0] +";base64,", "")
    fs.writeFileSync(path.resolve(__dirname, "../api/music/files/"+id+".mp3"), audio, "base64")
}
const getMusic = async (id:number)=>{
    if(fs.existsSync(path.resolve(__dirname, "../api/music/files/", id+".mp3"))){
        const file = fs.readFileSync(path.resolve(__dirname, "../api/music/files/", id+".mp3"))
        const data = "data:audio/mpeg;base64," + file.toString("base64")
        return data
    }
    return null;
}
class MusicService{
    async getMusicById(id:number){
        const allMusic = getMusicDB()
        const neededMusic = allMusic.find(a=>a.id === id)
        if(!neededMusic) throw ApiError.BadRequest("Трек не был найден.")
        const music = await getMusic(id)
        const img = getImg(id, "music")
        return {...neededMusic,music, img}
    }
    async getAllMusicByUserId(id:number){
        const allMusic = getMusicDB()
        const arrWithAudio = allMusic.map(a=>{
            const {id} = a
            const music = getMusic(id)
            return {...a, music}
        })
        return arrWithAudio
    }
    async addMusic(data:addAndUpdate){
        const allMusic = getMusicDB()
        const {name, author, album, music,img,userId} = data
        const id = Math.round(Math.random()*1000000000000)
        allMusic.push({name, author, album, id})
        fs.writeFileSync(path.resolve(__dirname, "../api/music/music.json"), JSON.stringify(allMusic))
        saveAudio(music,id)
        if(author) saveSongToAuthor(author, id)
        if(album) saveSongToAlbum(album, id)
        if(img) saveImg(id,img,"music")
        if(userId) saveSongToUser(userId, id)
        return {name, author, album, id}
    }
    async updateMusic(data:addAndUpdate){
        const allMusic = getMusicDB()
        const {name, author, album,id,music} = data
        const neededMusic = allMusic.find(a=>a.id===id)
        if(!neededMusic) throw ApiError.BadRequest("Трек не найден.")
        neededMusic.album = album;
        neededMusic.author = author;
        neededMusic.name = name;
        fs.writeFileSync(path.resolve(__dirname, "../api/music/music.json"), JSON.stringify(allMusic))
        if(music)saveAudio(music,id)
        return neededMusic
    }
    async deleteMusic(id:number){
        const allMusic = getMusicDB()
        const newArrOfMusic = allMusic.filter(a=>a.id!==id)
        fs.unlinkSync(path.resolve(__dirname,`../api/music/files/${id}.mp3`))
        fs.writeFileSync(path.resolve(__dirname, "../api/music/music.json"), JSON.stringify(newArrOfMusic))
    }
}

export default new MusicService()