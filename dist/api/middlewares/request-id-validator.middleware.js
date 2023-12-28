"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("../../utils/http-errors"));
const requestIdValidator = (req, res, next) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
        next(http_errors_1.default.BadRequest(`Is not a valid ObjectId: ${id}`));
    }
    next();
};
function isValidObjectId(id) {
    return /^[0-9a-fA-F]{24}$/.test(id);
}
exports.default = requestIdValidator;
//# sourceMappingURL=request-id-validator.middleware.js.map