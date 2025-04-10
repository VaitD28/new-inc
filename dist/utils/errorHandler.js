"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = ({ msg, path }) => {
    return {
        message: msg,
        field: path,
    };
};
exports.errorHandler = errorHandler;
