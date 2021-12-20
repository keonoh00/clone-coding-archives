import express from "express";
import {
  deleteUser,
  editProfile,
  postProfile,
  logout,
  dashboard,
  startGithubLogin,
  githubCallback,
} from "../controllers/userController";
import { publiconlyMiddleware, useronlyMiddleware } from "../middlewares";

const userRouter = express.Router();

userRouter.get("/logout", useronlyMiddleware, logout);
userRouter.route("/edit").all(useronlyMiddleware).get(editProfile).post(postProfile);
userRouter.get("/delete", useronlyMiddleware, deleteUser);
userRouter.get("/github/start", publiconlyMiddleware, startGithubLogin);
userRouter.get("/github/callback", publiconlyMiddleware, githubCallback);
userRouter.get("/:id", useronlyMiddleware, dashboard);

export default userRouter;
