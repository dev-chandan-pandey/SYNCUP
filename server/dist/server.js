"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const app_1 = __importDefault(require("./app"));
const db_1 = require("./config/db");
const redis_1 = require("./config/redis");
const socket_1 = require("./sockets/socket");
const feedController_1 = require("./controllers/feedController");
const PORT = process.env.PORT || 5000;
const startServer = async () => {
    await (0, db_1.connectDB)();
    await (0, redis_1.connectRedis)();
    const server = http_1.default.createServer(app_1.default);
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: "*",
        },
    });
    (0, socket_1.setupSocket)(io);
    (0, feedController_1.injectSocketIO)(io);
    server.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
};
startServer();
