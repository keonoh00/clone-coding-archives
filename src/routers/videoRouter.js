import express from "express";
import {
  postEdit,
  watchVideos,
  editVideos,
  uploadVideo,
  deleteVideo,
  postUpload,
} from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.route("/upload").get(uploadVideo).post(postUpload);
videoRouter.get("/:id(\\d+)", watchVideos);
videoRouter.route("/:id(\\d+)/edit").get(editVideos).post(postEdit);
videoRouter.get("/:id(\\d+)/delete", deleteVideo);

export default videoRouter;
