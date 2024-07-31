import express from "express";
import helmet from "helmet";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import morgan from "morgan";

import config from "./config/index";
import Logger from "./utils/logger";
import { verifyUser } from "./middleware/verifyUser";
const app = express();

import { todoRouter } from "./routes/todoRouter";
import { authRouter } from "./routes/authRouters";
import { boardRouter } from "./routes/boardRouter";
import { main } from "./db";
import { listRouter } from "./routes/listRouter";

if (config.nodeEnv === "production") {
  app.use(helmet());
}

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

if (config.nodeEnv !== "test") {
  app.use(morgan(config.nodeEnv === "production" ? "combined" : "dev"));
}

// app.use(config.apiBasePath);

app.use("/auth", authRouter);
app.use("/task", verifyUser, todoRouter);
app.use("/board", verifyUser, boardRouter);
app.use("/list", verifyUser, listRouter);

app.listen(config.port, () => {
  main().catch((error) => error);
  Logger.info(
    `
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️
      ################################################`
  ).on("error", (err) => {
    Logger.error(err);
    process.exit(1);
  });
});
