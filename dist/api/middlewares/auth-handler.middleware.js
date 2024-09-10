"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const isAuthenticated = async (req, res, next) => {
    if (req.user) {
        return next();
    }
    ;
    return res.sendStatus(http_status_codes_1.StatusCodes.UNAUTHORIZED);
};
exports.default = isAuthenticated;
//# sourceMappingURL=auth-handler.middleware.js.map