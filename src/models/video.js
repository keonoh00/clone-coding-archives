import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 50 },
  description: { type: String, required: true, trim: true, maxlength: 300 },
  createdAt: { type: Date, required: true, default: Date.now },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "user" },
  videoUrl: { type: String, required: true },
  hashtags: [{ type: String, trim: true }],
  meta: {
    views: { type: Number, default: 0, required: true },
    rating: { type: Number, default: 0, required: true },
  },
});

videoSchema.static("formatHashtags", (hashtags) => {
  return hashtags.split(",").map((tag) => (tag.trim().startsWith("#") ? tag : `#${tag}`));
});

const videoDB = mongoose.model("Video", videoSchema);

export default videoDB;
