import { Router } from "express";
import AlbumController from "../controllers/AlbumController";


const router = Router()

router.get("/getAlbumById/:id", AlbumController.getAlbumById)
router.get("/getAllAlbumsOfAuthor/:id", AlbumController.getAllAlbumsOfAuthor)
router.post("/createAlbum", AlbumController.createAlbum)
router.put("/updateAlbum", AlbumController.updateAlbum)
router.delete("/deleteAlbum/:id", AlbumController.deleteAlbum)
export default router