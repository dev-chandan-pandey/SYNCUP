"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFeed = exports.getFeeds = exports.injectSocketIO = void 0;
const Feed_1 = __importDefault(require("../models/Feed"));
const redis_1 = require("../config/redis");
const cacheKeys_1 = require("../utils/cacheKeys");
let io;
const injectSocketIO = (_io) => {
    io = _io;
};
exports.injectSocketIO = injectSocketIO;
const getFeeds = async (_req, res) => {
    try {
        // Check Redis Cache
        const cachedFeeds = await redis_1.redisClient.get(cacheKeys_1.CACHE_KEYS.FEEDS);
        if (cachedFeeds) {
            console.log("⚡ Serving feeds from Redis");
            return res.status(200).json({
                success: true,
                source: "cache",
                data: JSON.parse(cachedFeeds),
            });
        }
        // Fetch from MongoDB
        const feeds = await Feed_1.default.find().sort({ createdAt: -1 });
        // Store in Redis
        await redis_1.redisClient.set(cacheKeys_1.CACHE_KEYS.FEEDS, JSON.stringify(feeds), {
            EX: 60,
        });
        console.log("📦 Serving feeds from MongoDB");
        return res.status(200).json({
            success: true,
            source: "db",
            data: feeds,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch feeds",
        });
    }
};
exports.getFeeds = getFeeds;
const createFeed = async (req, res) => {
    try {
        const { content } = req.body;
        if (!content) {
            return res.status(400).json({
                success: false,
                message: "Content is required",
            });
        }
        const newFeed = await Feed_1.default.create({
            content,
        });
        // Invalidate Cache
        await redis_1.redisClient.del(cacheKeys_1.CACHE_KEYS.FEEDS);
        // Emit realtime event
        io.emit("new-feed", newFeed);
        return res.status(201).json({
            success: true,
            data: newFeed,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to create feed",
        });
    }
};
exports.createFeed = createFeed;
