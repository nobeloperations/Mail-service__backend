"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const exception_interceptor_middleware_1 = __importDefault(require("../../api/middlewares/exception-interceptor.middleware"));
const openedEmails_service_1 = __importDefault(require("../services/openedEmails.service"));
const emailOpenTracking = async (req, res) => {
    const emailId = req.query.emailId;
    await openedEmails_service_1.default.emailOpenTracking(emailId);
    const base64Image = 'R0lGODlhAQABAIAAAP///////ywAAAAAAQABAAACAkQBADs=';
    const imgBuffer = Buffer.from(base64Image, 'base64');
    res.writeHead(200, {
        'Content-Type': 'image/gif',
        'Content-Length': imgBuffer.length,
    });
    res.end(imgBuffer);
};
exports.default = {
    emailOpenTracking: (0, exception_interceptor_middleware_1.default)(emailOpenTracking)
};
//# sourceMappingURL=openedEmails.controller.js.map