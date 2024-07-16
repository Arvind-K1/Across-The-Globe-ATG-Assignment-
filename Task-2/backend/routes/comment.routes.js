import express from "express";
import { addComment, deleteComment } from "../controllers/comment.controller.js";


const router = express.Router();

router.post('/',addComment);
router.delete('/',deleteComment);

export default router;