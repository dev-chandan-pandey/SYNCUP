import { dot } from "node:test/reporters";
import { createClient } from "redis";
// const dotenv = require("dotenv");
// dotenv.config();
export const redisClient = createClient({
  url: process.env.REDIS_URL,
});

redisClient.on("error", (err) => {
  console.error("❌ Redis Error:", err);
});

export const connectRedis = async () => {
  try {
    await redisClient.connect();

    console.log("✅ Redis Connected");
  } catch (error) {
    console.error("❌ Redis Connection Error:", error);
  }
};