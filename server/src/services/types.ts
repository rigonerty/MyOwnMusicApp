export interface IAuthor{
    name:string,
    id:number,
    music:number[]
}
export interface IAlbum {
    name:string;
    id:number;
    music: number[];
    author:number;
}
export interface IUser{
    name: string;
    email:string;
    password:string;
    id:number;
    music: number[];
    fav:{type:"album"|"music"|"playlist",id:number}[];
    language:"english"|"russian";
    theme:"white"|"black"
}