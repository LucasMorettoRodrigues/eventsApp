"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandlerMiddleware = void 0;
const AppError_1 = require("../errors/AppError");
const ErrorHandlerMiddleware = (err, request, response, next) => {
    if (err instanceof AppError_1.AppError) {
        return response.status(err.statusCode).json({
            status: "error",
            message: err.message,
        });
    }
    return response.status(500).json({
        status: "error",
        message: `Internal server error: ${err.message}`,
    });
};
exports.ErrorHandlerMiddleware = ErrorHandlerMiddleware;
//# sourceMappingURL=errorHandlerMiddleware.js.map