import express from "express";
import { trendingVideos, searchVideos } from "../controllers/videoController";
import { join, login } from "../controllers/userController";


const globalRouter = express.Router();

globalRouter.get("/", trendingVideos);
globalRouter.get("/join", join);
globalRouter.get("/login", login);
globalRouter.get("/search", searchVideos)

export default globalRouter;