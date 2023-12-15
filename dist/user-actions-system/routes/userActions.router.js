"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userActions_controller_1 = __importDefault(require("../controllers/userActions.controller"));
const router = (0, express_1.default)();
router.get("/:id", userActions_controller_1.default.userActions);
exports.default = router;
//# sourceMappingURL=userActions.router.js.map