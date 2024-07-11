import express from "express";

import { forgotPassword, loginUser, registerUser, resetPassword } from "../controllers/user.controller.js";

const router = express.Router();

router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/forgot-password',forgotPassword);
router.post('/reset/:token',resetPassword);

export default router;