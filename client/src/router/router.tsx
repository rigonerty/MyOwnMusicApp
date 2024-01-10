import { Favorite } from "../pages/Favorite"
import { Home } from "../pages/Home"
import { RegisterPage } from "../pages/Register"
import { Settings } from "../pages/Settings"
import { User } from "../pages/User"

export const isNotAuthRouter = [
    {path:"/register", component: <RegisterPage/>}
]


export const isAuthRouter = [
    {path: "/user", component: <User/>},
    {path: "/settings", component: <Settings/>},
    {path: "/favorite", component: <Favorite/>},
    {path: "/music/:id", component: <div></div>},
    {path: "/music/:id/settings", component: <div></div>},
    {path: "/upload", component: <div></div>},
    {path: "/playlists/:id", component: <div></div>},
    {path:"/", component: <Home/>}
]

