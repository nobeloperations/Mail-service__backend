"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const exception_interceptor_middleware_1 = __importDefault(require("../../api/middlewares/exception-interceptor.middleware"));
const userActions_service_1 = __importDefault(require("../services/userActions.service"));
const userActions = async (req, res) => {
    const { id } = req.params;
    const typeOfActivity = typeof req.query.typeOfActivity === 'string' ? req.query.typeOfActivity : null;
    const userActions = await userActions_service_1.default.userActions(id, typeOfActivity);
    res.status(200).json({
        userActions
    });
};
exports.default = {
    userActions: (0, exception_interceptor_middleware_1.default)(userActions)
};
//# sourceMappingURL=userActions.controller.js.map