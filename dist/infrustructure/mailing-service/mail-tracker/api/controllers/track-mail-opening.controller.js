"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const track_mail_opening_service_1 = __importDefault(require("../services/track-mail-opening.service"));
const trackMailOpening = async (req, _) => {
    const { mailId } = req.params;
    await track_mail_opening_service_1.default.trackMailOpening(mailId);
};
exports.default = {
    trackMailOpening
};
//# sourceMappingURL=track-mail-opening.controller.js.map