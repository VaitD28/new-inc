"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoRoute = void 0;
const express_1 = require("express");
const db_1 = require("../db");
const video_1 = require("../types/video");
const videoValid_1 = require("../validators/videoValid");
const statuses_1 = require("../statuses");
exports.videoRoute = (0, express_1.Router)({});
let errors = {
    errorsMessages: [],
};
exports.videoRoute.get("", (req, res) => {
    res.status(200).send(db_1.videoDb);
});
exports.videoRoute.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const video = db_1.videoDb.video.find((video) => video.id === id);
    if (!video) {
        errors.errorsMessages.push({
            message: "Video not found",
            field: "id",
        });
    }
    if (errors.errorsMessages.length) {
        res.status(statuses_1.HTTP_STATUSES.BAD_REQUEST_400).send(errors);
        return;
    }
    res.status(200).send(video);
});
exports.videoRoute.post("", videoValid_1.videoPostValidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { availableResolutions } = req.body;
    if (Array.isArray(availableResolutions) && availableResolutions.length) {
        const isValid = availableResolutions.every((el) => Object.values(video_1.Resolutions).includes(el));
        if (!isValid) {
            errors.errorsMessages.push({
                message: "Invalid availableResolutions",
                field: "availableResolutions",
            });
        }
        if (errors.errorsMessages.length) {
            res.status(statuses_1.HTTP_STATUSES.BAD_REQUEST_400).send(errors);
            return;
        }
        const createdAt = new Date();
        const publicationDate = new Date();
        publicationDate.setDate(createdAt.getDate() + 1);
        const newVideo = {
            id: db_1.videoDb.video.length
                ? db_1.videoDb.video[db_1.videoDb.video.length - 1].id + 1
                : 1,
            title: req.body.title,
            author: req.body.author,
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: createdAt.toISOString(),
            publicationDate: publicationDate.toISOString(),
            availableResolutions,
        };
        db_1.videoDb.video.push(newVideo);
        res.status(201).send(newVideo);
    }
}));
exports.videoRoute.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = db_1.videoDb.video.findIndex((v) => v.id === id);
    //   const video = videoDb.video.find((video) => video.id === id);
    if (index === -1) {
        errors.errorsMessages.push({
            message: "Invalid id",
            field: "id",
        });
        res.status(statuses_1.HTTP_STATUSES.BAD_REQUEST_400).send(errors);
        return;
    }
    //   if (!video) {
    //     errors.errorsMessages.push({
    //       message: "Invalid id",
    //       field: "id",
    //     });
    //   }
    const { availableResolutions, canBeDownloaded, minAgeRestriction, publicationDate, } = req.body;
    if (Array.isArray(availableResolutions) && availableResolutions.length) {
        const isValid = availableResolutions.every((el) => Object.values(video_1.Resolutions).includes(el));
        if (!isValid) {
            errors.errorsMessages.push({
                message: "Invalid availableResolutions",
                field: "availableResolutions",
            });
        }
    }
    if (typeof canBeDownloaded !== "undefined" &&
        typeof canBeDownloaded !== "boolean") {
        errors.errorsMessages.push({
            message: "Invalid canBeDownloaded",
            field: "canBeDownloaded",
        });
    }
    if (!minAgeRestriction ||
        typeof minAgeRestriction !== "number" ||
        minAgeRestriction > 18 ||
        minAgeRestriction < 1) {
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
        res.status(statuses_1.HTTP_STATUSES.BAD_REQUEST_400).send(errors);
        return;
    }
    const newVideo = db_1.videoDb.video[index];
    (newVideo.title = req.body.title),
        (newVideo.author = req.body.author),
        (newVideo.availableResolutions = req.body.availableResolutions),
        (newVideo.canBeDownloaded = req.body.canBeDownloaded),
        (newVideo.minAgeRestriction = req.body.minAgeRestriction),
        (newVideo.publicationDate = req.body.publicationDate);
    res.sendStatus(statuses_1.HTTP_STATUSES.NO_CONTENT_204);
});
exports.videoRoute.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = db_1.videoDb.video.findIndex((v) => v.id === id);
    if (index === -1) {
        errors.errorsMessages.push({
            message: "Invalid id",
            field: "id",
        });
        res.status(statuses_1.HTTP_STATUSES.BAD_REQUEST_400).send(errors);
        return;
    }
    db_1.videoDb.video.splice(index, 1);
    res.sendStatus(statuses_1.HTTP_STATUSES.NO_CONTENT_204);
});
