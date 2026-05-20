import dotenv from "dotenv";
dotenv.config();

import http from "http";
import { Server } from "socket.io";

import app from "./app";

import { connectDB } from "./config/db";
import {
  connectRedis,
} from "./config/redis";

import { setupSocket } from "./sockets/socket";

import {
  injectSocketIO,
} from "./controllers/feedController";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  await connectRedis();

  const server = http.createServer(app);

  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  setupSocket(io);

  injectSocketIO(io);

  server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
};

startServer();