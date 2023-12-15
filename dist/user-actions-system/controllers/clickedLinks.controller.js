"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const exception_interceptor_middleware_1 = __importDefault(require("../../api/middlewares/exception-interceptor.middleware"));
const clickedLinks_service_1 = __importDefault(require("../services/clickedLinks.service"));
const emailLinkTracking = async (req, res) => {
    const emailId = req.query.emailId;
    const linkName = req.query.linkName;
    const redirectLink = linkName === "EduQuest" ? "https://eduquest.nobelexplorers.live" : "https://nobelexplorers.com/nobel-internships";
    await clickedLinks_service_1.default.emailLinkTracking(emailId, linkName);
    res.redirect(redirectLink);
};
exports.default = {
    emailLinkTracking: (0, exception_interceptor_middleware_1.default)(emailLinkTracking)
};
//# sourceMappingURL=clickedLinks.controller.js.map