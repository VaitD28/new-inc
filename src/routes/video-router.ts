import { Router, Response, Request } from "express";
import { videoDb } from "../db";
import { Resolutions, VideoPutType, VideoType } from "../types/video";
import { videoPostValidation } from "../validators/videoValid";
import { ErrorType } from "../utils/errorHandler";
import { HTTP_STATUSES } from "../statuses";

export const videoRoute = Router({});

let errors: ErrorType = {
  errorsMessages: [],
};

videoRoute.get("", (req: Request, res: Response) => {
  res.status(200).send(videoDb);
});

videoRoute.get("/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  const video = videoDb.video.find((video) => video.id === id);

  if (!video) {
    errors.errorsMessages.push({
      message: "Video not found",
      field: "id",
    });
  }

  if (errors.errorsMessages.length) {
    res.status(HTTP_STATUSES.BAD_REQUEST_400).send(errors);
    return;
  }

  res.status(200).send(video);
});

videoRoute.post(
  "",
  videoPostValidation,
  async (req: Request, res: Response) => {
    let { availableResolutions } = req.body;

    if (Array.isArray(availableResolutions) && availableResolutions.length) {
      const isValid = availableResolutions.every((el) =>
        Object.values(Resolutions).includes(el)
      );
      if (!isValid) {
        errors.errorsMessages.push({
          message: "Invalid availableResolutions",
          field: "availableResolutions",
        });
      }

      if (errors.errorsMessages.length) {
        res.status(HTTP_STATUSES.BAD_REQUEST_400).send(errors);
        return;
      }

      const createdAt: Date = new Date();
      const publicationDate: Date = new Date();

      publicationDate.setDate(createdAt.getDate() + 1);
      const newVideo: VideoType = {
        id: videoDb.video.length
          ? videoDb.video[videoDb.video.length - 1].id + 1
          : 1,
        title: req.body.title,
        author: req.body.author,
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: createdAt.toISOString(),
        publicationDate: publicationDate.toISOString(),
        availableResolutions,
      };

      videoDb.video.push(newVideo);

      res.status(201).send(newVideo);
    }
  }
);

videoRoute.put("/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  const index = videoDb.video.findIndex((v) => v.id === id);

  //   const video = videoDb.video.find((video) => video.id === id);

  if (index === -1) {
    errors.errorsMessages.push({
      message: "Invalid id",
      field: "id",
    });
    res.status(HTTP_STATUSES.BAD_REQUEST_400).send(errors);
    return;
  }
  //   if (!video) {
  //     errors.errorsMessages.push({
  //       message: "Invalid id",
  //       field: "id",
  //     });
  //   }

  const {
    availableResolutions,
    canBeDownloaded,
    minAgeRestriction,
    publicationDate,
  } = req.body;

  if (Array.isArray(availableResolutions) && availableResolutions.length) {
    const isValid = availableResolutions.every((el) =>
      Object.values(Resolutions).includes(el)
    );
    if (!isValid) {
      errors.errorsMessages.push({
        message: "Invalid availableResolutions",
        field: "availableResolutions",
      });
    }
  }

  if (
    typeof canBeDownloaded !== "undefined" &&
    typeof canBeDownloaded !== "boolean"
  ) {
    errors.errorsMessages.push({
      message: "Invalid canBeDownloaded",
      field: "canBeDownloaded",
    });
  }

  if (
    !minAgeRestriction ||
    typeof minAgeRestriction !== "number" ||
    minAgeRestriction > 18 ||
    minAgeRestriction < 1
  ) {
    errors.errorsMessages.push({
      message: "Invalid minAgeRestriction",
      field: "minAgeRestriction",
    });
  }

  if (!publicationDate || typeof publicationDate !== "string") {
    errors.errorsMessages.push({
      message: "Invalid publicationDate",
      field: "publicationDate",
    });
  }

  if (errors.errorsMessages.length) {
    res.status(HTTP_STATUSES.BAD_REQUEST_400).send(errors);
    return;
  }

  const newVideo = videoDb.video[index];

  (newVideo.title = req.body.title),
    (newVideo.author = req.body.author),
    (newVideo.availableResolutions = req.body.availableResolutions),
    (newVideo.canBeDownloaded = req.body.canBeDownloaded),
    (newVideo.minAgeRestriction = req.body.minAgeRestriction),
    (newVideo.publicationDate = req.body.publicationDate);

  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
});

videoRoute.delete("/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  const index = videoDb.video.findIndex((v) => v.id === id);

  if (index === -1) {
    errors.errorsMessages.push({
      message: "Invalid id",
      field: "id",
    });
    res.status(HTTP_STATUSES.BAD_REQUEST_400).send(errors);

    return;
  }

  videoDb.video.splice(index, 1);
  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
});
