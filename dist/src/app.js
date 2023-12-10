"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const scheduled_mails_router_1 = __importDefault(require("./api/routes/scheduled-mails.router"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use('/api', scheduled_mails_router_1.default);
app.get('/', (req, res) => {
    res.send('Hi');
});
exports.default = app;
//# sourceMappingURL=app.js.map