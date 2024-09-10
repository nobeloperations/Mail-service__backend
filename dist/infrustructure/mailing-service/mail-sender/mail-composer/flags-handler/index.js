"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const compiler_flags_handler_1 = __importDefault(require("./config/compiler-flags.handler"));
const handleFlags = (htmlText, mailFlags) => {
    if (!mailFlags)
        return htmlText;
    console.log('log');
    const modifiedText = (0, compiler_flags_handler_1.default)(htmlText, mailFlags);
    return modifiedText;
};
exports.default = {
    handleFlags
};
//# sourceMappingURL=index.js.map