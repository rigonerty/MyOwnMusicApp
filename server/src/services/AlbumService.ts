import * as path from 'path';
import fs from "fs"
import ApiError from "../exceptions/api-error";
import { getImg } from './helpers/getFile';
import { IAlbum } from './types';
import { saveAlbums } from './helpers/getFile';
interface data{
    name:string;
    id:number;
    music: number[];
    author:number;
}

const getAlbum = (id:number)=>{
    const albums:IAlbum[] = JSON.parse(fs.readFileSync(path.resolve(__dirname,"../api/music/album.json")).toString())
    const neededAlbum = albums.find(a=>a.id ===id)
    return neededAlbum
}

const getAllAlbums = ()=>{
    const albums:IAlbum[] = JSON.parse(fs.readFileSync(path.resolve(__dirname,"../api/music/album.json")).toString())
    return albums
}

class AlbumService{
    async getAlbumById(id:number){
        const album = getAlbum(id)
        if(!album) throw ApiError.BadRequest("Альбом не найден.")
        const img = getImg(id, "album")
        return {...album, img}
    }
    async getAllAlbumsOfAuthor(id:number){
        const albums = getAllAlbums()
        const neededAlbums = albums.filter(a=>a.author === id)
        if(!neededAlbums.length) throw ApiError.BadRequest("Альбомы не найдены.")
        return neededAlbums
    }
    async createAlbum(data:data){
        const albums = getAllAlbums()
        const {name,author,music} = data
        const id = Math.round(Math.random()*1000000000000)
        albums.push({name,author,music,id})
        saveAlbums(albums)
        return {name,author,music,id}
    }
    async updateAlbum(data:data){
        const albums = getAllAlbums()
        const {name,id,music,author} = data;
        const neededAlbum = albums.find(a=>a.id === id)
        if(!neededAlbum) throw ApiError.BadRequest("Альбом не найден.")
        neededAlbum.name = name;
        neededAlbum.author = author;
        neededAlbum.music = music;
        saveAlbums(albums)
        return neededAlbum
    }
    async deleteAlbum(id:number){
        const albums = getAllAlbums()
        const newArr = albums.filter(a=>a.id !== id)
        saveAlbums(newArr)
        return newArr
    }
}

export default new AlbumService()