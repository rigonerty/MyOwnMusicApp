import { Router } from "express";
import AuthController from "../controllers/AuthController";
import{body} from "express-validator"
const router = Router()

router.post("/register",
    body("name").isLength({min:4,max:20}),
    body("email").isLength({min:4,max:40}),
    body("password").isLength({min:8,max:30}),
    AuthController.register)
router.post("/login", AuthController.login)
router.post("/logout", AuthController.loguot)
router.get("/refresh", AuthController.refresh)

export default router