"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./config"));
const decorateMailTextWithNecessaryLinksForTraking = (mailText, emailId) => {
    for (const key in config_1.default.linksToTrack) {
        const { requestEndpoint, regExpMatchPattern } = config_1.default.linksToTrack[key];
        const targetEndpoint = `${requestEndpoint}/${emailId}`;
        mailText = mailText.replace(regExpMatchPattern, `$1${targetEndpoint}$2`);
    }
    const spyPixel = `<img src="${config_1.default.baseTrakingForMailOpening}/${emailId}" alt="pixel">`;
    mailText = mailText.replace('</body>', `${spyPixel}</body>`);
    return mailText;
};
exports.default = {
    decorateMailTextWithNecessaryLinksForTraking
};
//# sourceMappingURL=index.js.map