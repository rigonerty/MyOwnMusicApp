import { Router } from "express";
import AuthorController from "../controllers/AuthorController";


const router = Router()


router.get("/getAuthorById/:id", AuthorController.getAuthorById)
router.get("/getAllAuthors", AuthorController.getAllAuthors)
router.post("/createAuthor", AuthorController.createAuthor)
router.put("/updateAuthor", AuthorController.updateAuthor)
router.delete("/deleteAuthor/:id", AuthorController.deleteAuthor)
export default router