"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const custom_api_errors_1 = __importDefault(require("../../utils/errors/custom-api-errors"));
const isValidId = (req, res, next) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
        next(custom_api_errors_1.default.BadRequest(`${id} is not valid id`));
    }
    next();
};
function isValidObjectId(id) {
    return /^[0-9a-fA-F]{24}$/.test(id);
}
exports.default = isValidId;
//# sourceMappingURL=isValidId.js.map