import { Router } from "express";
import PlaylistController from "../controllers/PlaylistController";


const router = Router()


router.get("/getPlaylistById/:id", PlaylistController.getPlaylistById)
router.get("/getAllPlaylistsOfUser/:id", PlaylistController.getAllPlaylistsOfAuthor)
router.post("/createPlaylist", PlaylistController.createPlaylist)
router.put("/updatePlaylist", PlaylistController.updatePlaylist)
router.delete("/deletePlaylist/:id", PlaylistController.deletePlaylist)
export default router