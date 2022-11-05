import express from "express";
import { createServer } from "http";
import dotenv from "dotenv";
import "dotenv/config";
import authRoute from "./routes/authRouter";
import songsRoute from "./routes/songs";
import { corsConfig } from "./middlewares/session";
import errorHandler from "./middlewares/error-handler";
import artistsRoute from "./routes/artists";
import helmet from "helmet";
import cors from "cors";

dotenv.config({ path: "../.env" });
const app = express();

const httpServer = createServer(app);
const PORT = process.env.PORT || 4444;

app.use(helmet());
app.use(cors(corsConfig));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(errorHandler);

// initialize routes
app.get("/", (req, res, next) => res.json("welcome to the api"));
app.use("/api/auth", authRoute);
app.use("/api/artists", artistsRoute);
app.use("/api/songs", songsRoute);

httpServer.listen(PORT);
