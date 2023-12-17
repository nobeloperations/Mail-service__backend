"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authenticate_1 = __importDefault(require("../../api/middlewares/authenticate"));
const userActions_controller_1 = __importDefault(require("../controllers/userActions.controller"));
const isValidId_1 = __importDefault(require("../../api/middlewares/isValidId"));
const router = (0, express_1.default)();
router.get("/:id", authenticate_1.default, isValidId_1.default, userActions_controller_1.default.userActions);
exports.default = router;
//# sourceMappingURL=userActions.router.js.map