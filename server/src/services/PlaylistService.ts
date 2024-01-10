import * as path from 'path';
import fs from "fs"
import ApiError from "../exceptions/api-error";

interface data{
    name:string;
    id:number;
    music: number[];
    userId:number;
}

const getPlaylist = (id:number)=>{
    const playlists:data[] = JSON.parse(fs.readFileSync(path.resolve(__dirname,"../api/user/playlist.json")).toString())
    const neededPlaylist = playlists.find(a=>a.id ===id)
    return neededPlaylist
}

const savePlaylists = (arr:data[])=>{
    fs.writeFileSync(path.resolve(__dirname,"../api/user/playlist.json"), JSON.stringify(arr))
}

const getAllPlaylists = ()=>{
    const playlists:data[] = JSON.parse(fs.readFileSync(path.resolve(__dirname,"../api/user/playlist.json")).toString())
    return playlists
}

class PlaylistService{
    async getPlaylistById(id:number){
        const Playlist = getPlaylist(id)
        if(!Playlist) throw ApiError.BadRequest("Плейлист не найден.")
        return Playlist
    }
    async getAllPlaylistsOfAuthor(id:number){
        const Playlists = getAllPlaylists()
        const neededPlaylists = Playlists.filter(a=>a.userId === id)
        if(!neededPlaylists.length) throw ApiError.BadRequest("Плейлисты не найдены.")
        return neededPlaylists
    }
    async createPlaylist(data:data){
        const playlists = getAllPlaylists()
        const {name,userId,music} = data
        const id = Math.round(Math.random()*1000000000000)
        playlists.push({name,userId,music,id})
        savePlaylists(playlists)
        return {name,userId,music,id}
    }
    async updatePlaylist(data:data){
        const Playlists = getAllPlaylists()
        const {name,id,music} = data;
        const neededPlaylist = Playlists.find(a=>a.id === id)
        if(!neededPlaylist) throw ApiError.BadRequest("Плейлист не найден.")
        neededPlaylist.name = name;
        neededPlaylist.music = music;
        savePlaylists(Playlists)
        return neededPlaylist
    }
    async deletePlaylist(id:number){
        const playlists = getAllPlaylists()
        const newArr = playlists.filter(a=>a.id !== id)
        savePlaylists(newArr)
        return newArr
    }
}
export default new PlaylistService()