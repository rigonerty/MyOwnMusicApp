import { Router } from "express";
import{body} from "express-validator"
import UserController from "../controllers/UserController";
const router = Router()

router.post("/update", UserController.update)
router.post("/favorite", UserController.favorite)


export default router