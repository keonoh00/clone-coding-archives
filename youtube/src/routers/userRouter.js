import express from "express";
import {
  deleteUser,
  editProfile,
  postProfile,
  logout,
  dashboard,
  startGithubLogin,
  githubCallback,
  changePassword,
  postPassword,
  userProfile,
} from "../controllers/userController";
import { publiconlyMiddleware, uploadProfilePhoto, useronlyMiddleware } from "../middlewares";

const userRouter = express.Router();

userRouter.get("/logout", useronlyMiddleware, logout);
userRouter
  .route("/edit")
  .all(useronlyMiddleware)
  .get(editProfile)
  .post(uploadProfilePhoto.single("profilePhoto"), postProfile);
userRouter.route("/change-password").all(useronlyMiddleware).get(changePassword).post(postPassword);
userRouter.get("/delete", useronlyMiddleware, deleteUser);
userRouter.get("/github/start", publiconlyMiddleware, startGithubLogin);
userRouter.get("/github/callback", publiconlyMiddleware, githubCallback);
userRouter.get("/dashboard", useronlyMiddleware, dashboard);
userRouter.get("/:id", userProfile);

export default userRouter;
