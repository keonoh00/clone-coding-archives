import mongoose from "mongoose";
require("dotenv").config();
mongoose.connect(process.env.DB_URL);
// if warning use below code
// mongoose.connect("mongodb://127.0.0.1:27017/youtube", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

const handleOpen = () => console.log("✅ Connected to MongoDB");
const handleError = (error) => console.log("❌ MongoDB Error", error);

const db = mongoose.connection;

db.on("error", handleError);
db.once("open", handleOpen);
