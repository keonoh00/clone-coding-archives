import express from "express";
import { deleteUser, editUser, logout, dashboard } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/logout", logout)
userRouter.get("/edit", editUser);
userRouter.get("/delete", deleteUser);
userRouter.get(":id", dashboard);

export default userRouter;