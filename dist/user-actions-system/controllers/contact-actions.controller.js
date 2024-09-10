"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const exception_interceptor_middleware_1 = __importDefault(require("../../api/middlewares/exception-interceptor.middleware"));
const contact_actions_service_1 = __importDefault(require("../services/contact-actions.service"));
const emailOpenTracking = async (req, res) => {
    const emailId = req.query.emailId;
    await contact_actions_service_1.default.emailOpenTracking(emailId);
    const base64Image = 'R0lGODlhAQABAIAAAP///////ywAAAAAAQABAAACAkQBADs=';
    const imgBuffer = Buffer.from(base64Image, 'base64');
    res.writeHead(200, {
        'Content-Type': 'image/gif',
        'Content-Length': imgBuffer.length,
    });
    res.end(imgBuffer);
};
const emailLinkTracking = async (req, res) => {
    const emailId = req.query.emailId;
    const linkName = req.query.linkName;
    const redirectLink = linkName === "EduQuest" ? "https://eduquest.nobelexplorers.live" : "https://nobelexplorers.com/nobel-internships";
    await contact_actions_service_1.default.emailLinkTracking(emailId, linkName);
    res.redirect(redirectLink);
};
const unsubscribe = async (req, res) => {
    const { id } = req.params;
    await contact_actions_service_1.default.unsubscribe(id);
    res.status(200).json({ message: "Unsubscribed success" });
};
const unsubscribedContactsList = async (req, res) => {
    const users = await contact_actions_service_1.default.unsubscribedContactsList();
    res.status(200).json({ users });
};
const subscribe = async (req, res) => {
    const { id } = req.params;
    await contact_actions_service_1.default.subscribe(id);
    res.status(200).json({ message: "Subscribed success" });
};
exports.default = {
    unsubscribe: (0, exception_interceptor_middleware_1.default)(unsubscribe),
    unsubscribedContactsList: (0, exception_interceptor_middleware_1.default)(unsubscribedContactsList),
    emailOpenTracking: (0, exception_interceptor_middleware_1.default)(emailOpenTracking),
    emailLinkTracking: (0, exception_interceptor_middleware_1.default)(emailLinkTracking),
    subscribe: (0, exception_interceptor_middleware_1.default)(subscribe)
};
//# sourceMappingURL=contact-actions.controller.js.map