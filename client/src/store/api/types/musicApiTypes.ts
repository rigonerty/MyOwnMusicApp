export interface IUpdateMusic{
    name:string;
    id?:number;
    author:number;
    album:number;
    music:string;
    img:string;
}
export interface IAddMusic{
    name:string;
    author:number;
    album:number;
    music:string;
    img:string;
    userId:number    
}
export interface IMusicResponse{
    name:string;
    id:number;
    author:number;
    album:number;
    music: string;
    img:string
}