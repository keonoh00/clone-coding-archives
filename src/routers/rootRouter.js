import express from "express";
import { home, searchVideos } from "../controllers/videoController";
import { createAccount, postAccount, login } from "../controllers/userController";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.route("/join").get(createAccount).post(postAccount);
rootRouter.get("/login", login);
rootRouter.get("/search", searchVideos);

export default rootRouter;
