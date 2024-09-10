"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
function isAuthenticated(req, res, next) {
    if (req.user) {
        return next();
    }
    res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).send(http_status_codes_1.ReasonPhrases.UNAUTHORIZED);
}
;
exports.default = isAuthenticated;
//# sourceMappingURL=is-authenticated.middleware.js.map