import express, { Express } from "express";
import { videoRoute } from "./routes/video-router";
import { testRoute } from "./routes/test-router";

export const setupApp = (app: Express) => {
  app.use(express.json());

  app.use("/api/videos", videoRoute);
  app.use("/api/testing", testRoute);

  return app;
};
