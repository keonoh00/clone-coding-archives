import express from "express";
import { home, searchVideos } from "../controllers/videoController";
import { createAccount, postAccount, login, postLogin } from "../controllers/userController";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.route("/join").get(createAccount).post(postAccount);
rootRouter.route("/login").get(login).post(postLogin);
rootRouter.get("/search", searchVideos);

export default rootRouter;
