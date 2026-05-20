"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const feedController_1 = require("../controllers/feedController");
const router = (0, express_1.Router)();
router.get("/", feedController_1.getFeeds);
router.post("/", feedController_1.createFeed);
exports.default = router;
