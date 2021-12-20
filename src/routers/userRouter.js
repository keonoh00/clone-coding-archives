import express from "express";
import {
  deleteUser,
  editUser,
  logout,
  dashboard,
  startGithubLogin,
  githubCallback,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/logout", logout);
userRouter.get("/edit", editUser);
userRouter.get("/delete", deleteUser);
userRouter.get("/github/start", startGithubLogin);
userRouter.get("/github/callback", githubCallback);
userRouter.get("/:id", dashboard);

export default userRouter;
