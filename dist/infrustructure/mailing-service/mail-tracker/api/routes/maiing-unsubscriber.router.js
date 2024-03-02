"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mailing_unsubscribe_controller_1 = __importDefault(require("../controllers/mailing-unsubscribe.controller"));
const router = (0, express_1.default)();
router.get('/:mailId', mailing_unsubscribe_controller_1.default.unsubscribeContactFromMailing);
exports.default = router;
//# sourceMappingURL=maiing-unsubscriber.router.js.map