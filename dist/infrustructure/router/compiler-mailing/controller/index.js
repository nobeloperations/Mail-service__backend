"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const service_1 = __importDefault(require("../service"));
const setCompilerMailing = async (req, res) => {
    try {
        const data = req.body;
        const notFoundRecipients = await service_1.default.setCompilerMailing(data);
        res.status(200).send({
            status: 'OK',
            notFoundRecipients: notFoundRecipients
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).send('Server error');
    }
};
exports.default = {
    setCompilerMailing
};
//# sourceMappingURL=index.js.map