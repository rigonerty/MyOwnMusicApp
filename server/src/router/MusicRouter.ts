import { Router } from "express";
import MusicController from "../controllers/MusicController";

const router = Router()

router.get("/getMusicById/:id", MusicController.getMusicById)
router.get("/getAllMusicByUserId", MusicController.getAllMusicByUserId)
router.post("/addMusic", MusicController.addMusic)
router.put("/updateMusic", MusicController.updateMusic)
router.delete("/deleteMusic/:id", MusicController.deleteMusic)
export default router