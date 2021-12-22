import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  profilePhoto: { type: String },
  socialLogin: { required: true, type: Boolean, default: false },
  description: { type: String },
  password: { type: String },
  name: { type: String, required: true },
  location: { type: String },
  createdVideos: [{ type: mongoose.Schema.Types.ObjectId, ref: "video" }],
});

// is using static more secure???
// pre method requires transmission of data through post method
userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = this.password === "" ? "" : await bcrypt.hash(this.password, 5);
  }
});

userSchema.static("checkPassword", async (password, hash) => {
  const match = await bcrypt.compare(password, hash);
  return match;
});

const userDB = mongoose.model("user", userSchema);

export default userDB;
