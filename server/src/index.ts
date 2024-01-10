import express from 'express'
import cors from "cors"
import dotenv from "dotenv"
import helmet from 'helmet';
import AuthRouter from "./router/AuthRouter"
import MusicRouter from "./router/MusicRouter"
import PlaylistRouter from "./router/PlaylistRouter"
import AuthorRouter from "./router/AuthorRouter"
import AlbumRouter from "./router/AlbumRouter"
import UserRouter from "./router/UserRouter"
import errorMiddleware from './middlewares/errorMiddleware';
import cookieParser from "cookie-parser"
const app = express();

dotenv.config()

//Adds
app.use(cors({
    credentials:true,
    origin: "http://localhost:3000"
}))
app.use(helmet())
app.use(express.json({limit:"50mb"}))
app.use(errorMiddleware)
app.use(cookieParser())

//Routers
app.use("/auth",AuthRouter)
app.use("/music",MusicRouter)
app.use("/playlist",PlaylistRouter)
app.use("/author",AuthorRouter)
app.use("/album",AlbumRouter)
app.use("/user", UserRouter)




const port = process.env.PORT || 5000;
app.get('/', async (request, response) => {
  response.send(`
    <h1>Hey everyone, I make my fist typescript node project! 😁</h1>
    <p>PORT: ${port}</p>
  `);
});
app.listen(port, () => console.log(`Running on port ${port}`));



// interface music{
//   name: string;
//   author: number;
//   id:number;
//   album: number;
// }
// interface album{
//   name:string;
//   author: number;
//   id:number;
//   music: number[]
// }
// interface author{
//   name:string;
//   id:number;
//   music: number[]
// }