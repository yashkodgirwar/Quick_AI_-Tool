import express from "express";
import { auth } from "../middlewares/auth.js";
import { getPublishedCreation, getUserCreation, togglelikeCration } from "../controller/userController";

const userRouter = express. Router();
userRouter. get('/get-user-creations', auth, getUserCreation)
userRouter. get('/get-published-crations', auth, getPublishedCreation)
userRouter. post('/toggle-like-creations', auth, togglelikeCration)

export default userRouter;

