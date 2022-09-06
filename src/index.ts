import express, { Response } from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import routes from "./routes";
import fileUpload from "express-fileupload";
import { configureCloudinary } from "./integrations/cloudinary";
import mongoose from "./integrations/mongooose";
import seeder from "./seeder/seeder";
import config from "./config";
import SocketManager from "./managers/SocketManager";

const main = async () => {
  const app = express();
  configureCloudinary();

  const conn = mongoose.connection;
  conn.on("error", console.error.bind(console, "connection error:"));
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
    // transports: ["websocket"],
  });
  app.use(cors({ origin: "*" }));
  app.use(fileUpload());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  await seeder();

  const port = config.PORT || 4000;

  app.get("/", (_, res: Response) => {
    res.send("Yoo");
  });

  app.use(routes);

  io.on("connection", (socket) => SocketManager.connect(socket, io));

  server.listen(port, () => {
    if (config.NODE_ENV === "development") {
      console.info(
        `⚡️[server]: Server is running at http://localhost:${port}`
      );
    } else {
      console.info(`⚡️[server]: Server is running`);
    }
  });
};

main();
