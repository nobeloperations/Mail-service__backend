"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mailing_unsubscriber_service_1 = __importDefault(require("../services/mailing-unsubscriber.service"));
const unsubscribeContactFromMailing = async (req, _) => {
    const { mailId } = req.params;
    await mailing_unsubscriber_service_1.default.unsubscribeContactFromMailing(mailId);
};
exports.default = {
    unsubscribeContactFromMailing
};
//# sourceMappingURL=mailing-unsubscribe.controller.js.map