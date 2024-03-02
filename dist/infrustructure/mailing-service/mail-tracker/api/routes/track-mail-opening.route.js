"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const track_mail_opening_controller_1 = __importDefault(require("../controllers/track-mail-opening.controller"));
const router = (0, express_1.default)();
router.get('/:mailId', track_mail_opening_controller_1.default.trackMailOpening);
exports.default = router;
//# sourceMappingURL=track-mail-opening.route.js.map