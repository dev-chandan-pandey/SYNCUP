import { Router } from "express";
import {
  createFeed,
  getFeeds,
} from "../controllers/feedController";

const router = Router();

router.get("/", getFeeds);
router.post("/", createFeed);

export default router;