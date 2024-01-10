import cl from "./MusicCard.module.scss"
interface props{
    name:string;
    author:string;
    text:string;
    album:string;
    img:string;
    type:"block"|"line";
    onClick?: ()=> void;
    onClickFav?: ()=>void;
    mainStyle?: any;
}


export const MusicCard = ({name,author,album,text,img,type, onClick=()=>{},onClickFav=()=>{}, mainStyle={}}:props) => {
  return (
    <div className={type==="block"?cl.MusicCard:cl.MusicCardLine} onClick={onClick} style={mainStyle}>
        <img src={img}/>
        <div>
            <p className={cl.MusicCardName}>{name}</p>
            <div className={cl.MusicCardInfo}>
              <p className={cl.MusicCardAuthor}>{author}</p>
              <hr/>
              <p className={cl.MusicCardAlbum}>{album}</p>
            </div>
        </div>
        
    </div>
  )
}
