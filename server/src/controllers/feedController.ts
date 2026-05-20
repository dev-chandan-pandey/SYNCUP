import { Request, Response } from "express";
import Feed from "../models/Feed";
import { redisClient } from "../config/redis";
import { CACHE_KEYS } from "../utils/cacheKeys";

let io: any;

export const injectSocketIO = (_io: any) => {
  io = _io;
};

export const getFeeds = async (_req: Request, res: Response) => {
  try {
    // Check Redis Cache
    const cachedFeeds = await redisClient.get(CACHE_KEYS.FEEDS);

    if (cachedFeeds) {
      console.log("⚡ Serving feeds from Redis");

      return res.status(200).json({
        success: true,
        source: "cache",
        data: JSON.parse(cachedFeeds),
      });
    }

    // Fetch from MongoDB
    const feeds = await Feed.find().sort({ createdAt: -1 });

    // Store in Redis
    await redisClient.set(
      CACHE_KEYS.FEEDS,
      JSON.stringify(feeds),
      {
        EX: 60,
      }
    );

    console.log("📦 Serving feeds from MongoDB");

    return res.status(200).json({
      success: true,
      source: "db",
      data: feeds,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch feeds",
    });
  }
};

export const createFeed = async (req: Request, res: Response) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({
        success: false,
        message: "Content is required",
      });
    }

    const newFeed = await Feed.create({
      content,
    });

    // Invalidate Cache
    await redisClient.del(CACHE_KEYS.FEEDS);

    // Emit realtime event
    io.emit("new-feed", newFeed);

    return res.status(201).json({
      success: true,
      data: newFeed,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to create feed",
    });
  }
};