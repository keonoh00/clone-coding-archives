import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now() },
  video: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "video" },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "user" },
});

const commentDB = mongoose.model("comment", commentSchema);

export default commentDB;
