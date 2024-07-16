import express from 'express';
import { likePost, unlikePost } from '../controllers/like.controller.js';


const router = express.Router();

router.post('/',likePost);
router.post('/unlike',unlikePost);

export default router;

