"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const unsubscribe_controller_1 = __importDefault(require("../controllers/unsubscribe.controller"));
const router = (0, express_1.default)();
router.get("/unsubscribe", unsubscribe_controller_1.default.unsubscribe);
exports.default = router;
//# sourceMappingURL=unsubscribe.router.js.map