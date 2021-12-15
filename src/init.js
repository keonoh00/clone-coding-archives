import "./db.js";
import "./models/video.js";
import app from "./server.js";

const PORT = 4000;

const handleListening = () => {
  console.log(`✅ Server Listening to port ${4000} on http://localhost:${PORT}`);
};

app.listen(PORT, handleListening);
