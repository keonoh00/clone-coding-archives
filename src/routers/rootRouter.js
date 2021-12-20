import express from "express";
import { home, searchVideos } from "../controllers/videoController";
import { createAccount, postAccount, login, postLogin } from "../controllers/userController";
import { all } from "express/lib/application";
import { publiconlyMiddleware } from "../middlewares";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.route("/join").all(publiconlyMiddleware).get(createAccount).post(postAccount);
rootRouter.route("/login").all(publiconlyMiddleware).get(login).post(postLogin);
rootRouter.get("/search", searchVideos);

export default rootRouter;
