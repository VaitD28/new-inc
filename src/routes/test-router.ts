import { Router, Response, Request } from "express";
import { videoDb } from "../db";
import { HTTP_STATUSES } from "../statuses";

export const testRoute = Router({});

testRoute.delete("/all-data", (req: Request, res: Response) => {
  videoDb.video = [];
  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
});
