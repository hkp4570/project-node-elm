
import express from "express";
import UserHandler from '../controller/v2/user';

const router = express.Router();

router.post('/login', UserHandler.login);

export default router;
