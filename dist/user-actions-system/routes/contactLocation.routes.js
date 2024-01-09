"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contactLocation_controller_1 = require("../controllers/contactLocation.controller");
const router = (0, express_1.Router)();
router.get('/location', contactLocation_controller_1.getLocation);
exports.default = router;
//# sourceMappingURL=contactLocation.routes.js.map