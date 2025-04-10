"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupApp = void 0;
const express_1 = __importDefault(require("express"));
const video_router_1 = require("./routes/video-router");
const test_router_1 = require("./routes/test-router");
const setupApp = (app) => {
    app.use(express_1.default.json());
    app.use("/api/videos", video_router_1.videoRoute);
    app.use("/api/testing", test_router_1.testRoute);
    return app;
};
exports.setupApp = setupApp;
