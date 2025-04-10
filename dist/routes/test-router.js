"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testRoute = void 0;
const express_1 = require("express");
const db_1 = require("../db");
const statuses_1 = require("../statuses");
exports.testRoute = (0, express_1.Router)({});
exports.testRoute.delete("/all-data", (req, res) => {
    db_1.videoDb.video = [];
    res.sendStatus(statuses_1.HTTP_STATUSES.NO_CONTENT_204);
});
