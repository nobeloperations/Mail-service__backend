"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mailing_unsubscriber_service_1 = __importDefault(require("../services/mailing-unsubscriber.service"));
const unsubscribeContactFromMailing = async (req, res) => {
    const { mailId } = req.params;
    await mailing_unsubscriber_service_1.default.unsubscribeContactFromMailing(mailId);
    res.redirect(process.env.UNSUBSCRIBE_MAILING_REDIRECT_LINK);
};
exports.default = {
    unsubscribeContactFromMailing
};
//# sourceMappingURL=mailing-unsubscribe.controller.js.map