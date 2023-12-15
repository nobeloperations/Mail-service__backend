"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const placeholder_service_1 = __importDefault(require("./services/placeholder.service"));
const replacePlaceholdersWithContactDataInMailTemplate = async (mailText, contactData) => {
    const contactDataplaceholderRegex = /%(\w+)%/g;
    const placeholdersData = await placeholder_service_1.default.getMapCollectionOfContactPlaceholders();
    const formatedMailText = mailText.replace(contactDataplaceholderRegex, (match, placeholder) => {
        const targetContactField = placeholdersData.get(match);
        return placeholdersData.get(match) && contactData.hasOwnProperty(targetContactField)
            ? contactData[targetContactField]
            : match;
    });
    return formatedMailText;
};
exports.default = {
    replacePlaceholdersWithContactDataInMailTemplate
};
//# sourceMappingURL=mail-placeholder-replacer.js.map