import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  location: { type: String },
});

// is using static more secure???
// pre method requires transmission of data through post method
userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 5);
});

const userDB = mongoose.model("user", userSchema);

export default userDB;
