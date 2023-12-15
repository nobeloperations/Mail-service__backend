"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const exception_interceptor_middleware_1 = __importDefault(require("../../api/middlewares/exception-interceptor.middleware"));
const unsubscribe_service_1 = __importDefault(require("../services/unsubscribe.service"));
const unsubscribe = async (req, res) => {
    const id = req.query.contactId;
    await unsubscribe_service_1.default.unsubscribe(id);
    res.status(200).json({ message: "Unsubscribed success" });
};
exports.default = {
    unsubscribe: (0, exception_interceptor_middleware_1.default)(unsubscribe)
};
//# sourceMappingURL=unsubscribe.controller.js.map