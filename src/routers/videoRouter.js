import express from "express";
import {
  postEdit,
  watchVideos,
  editVideos,
  uploadVideo,
  deleteVideo,
} from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/upload", uploadVideo);
videoRouter.get("/:id(\\d+)", watchVideos);
videoRouter.route("/:id(\\d+)/edit").get(editVideos).post(postEdit);
videoRouter.get("/:id(\\d+)/delete", deleteVideo);

export default videoRouter;
