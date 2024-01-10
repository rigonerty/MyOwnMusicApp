export interface IUpdate{
    id:number;
    img:string;
    name: string;
    oldPassword: string;
    newPassword: string;
    email:string;
    theme: "white"|"black";
    language:"english"|"russian"
}
export interface IUpdateRes{
    id:number;
    name: string;
    email:string;
    theme: "white"|"black";
    language:"english"|"russian"    
} 
export interface IFavorite{
    id:number;
    fav: {type:"album"|"music"|"playlist",id:number}[];
}