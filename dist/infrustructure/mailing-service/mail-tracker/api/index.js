"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const maiing_unsubscriber_router_1 = __importDefault(require("./routes/maiing-unsubscriber.router"));
const router = (0, express_1.default)();
// router.use('/track-mail-opening', TrackMailOpeningRouter);
router.use('/unsubscribe-from-mailing', maiing_unsubscriber_router_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map