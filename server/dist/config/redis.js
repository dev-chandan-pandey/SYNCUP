"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectRedis = exports.redisClient = void 0;
const redis_1 = require("redis");
// const dotenv = require("dotenv");
// dotenv.config();
exports.redisClient = (0, redis_1.createClient)({
    url: process.env.REDIS_URL,
});
exports.redisClient.on("error", (err) => {
    console.error("❌ Redis Error:", err);
});
const connectRedis = async () => {
    try {
        await exports.redisClient.connect();
        console.log("✅ Redis Connected");
    }
    catch (error) {
        console.error("❌ Redis Connection Error:", error);
    }
};
exports.connectRedis = connectRedis;
