import express from "express";

const userRouter = express.Router();
const handleUserEdit = (req, res) => res.send("Edit User");
userRouter.get("/edit", handleUserEdit);

export default userRouter;