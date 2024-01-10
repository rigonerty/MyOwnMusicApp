export interface IUser{
    isAuth: boolean;
    name:string;
    id:number;
    img:string;
    email: string;
    fav:{type:"album"|"music"|"playlist",id:number}[];
    language:"english"|"russian";
    theme:"white"|"black"
}


export interface ISetUser{
    id: number;
    email:string;
    name:string; 
    img:string;
    fav:{type:"album"|"music"|"playlist",id:number}[];
    language:"english"|"russian";
    theme:"white"|"black"   
}
export interface actionUser{
    refreshToken: string;
    accessToken: string;
    user:{ 
        id: number;
        email:string;
        name:string; 
        music: number[];
        img:string;
        fav:{type:"album"|"music"|"playlist",id:number}[];
        language:"english"|"russian";
        theme:"white"|"black"
    }
}
export interface IFavorite{
    type: "album"|"music"|"playlist";
    id:number;
}