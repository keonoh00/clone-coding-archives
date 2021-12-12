import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const app = express();
const logger = morgan("dev");
const PORT = 4000;

app.use(logger);
app.use("/", globalRouter);
app.use("/user", userRouter);
app.use("/videos", videoRouter);


const handleListening = () => {
    console.log(`🚀 Server Listening to port ${4000} on http://localhost:${PORT}`);
};

app.listen(PORT, handleListening);