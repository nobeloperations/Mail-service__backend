"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_client_1 = __importDefault(require("../../database/prisma-client"));
class DescriptionGenerator {
    constructor() {
    }
    async generateDescriptionForEmailsActions(templateId) {
        const { name } = await prisma_client_1.default.mailTemplate.findUnique({
            where: {
                id: templateId
            }
        });
        return `Email '${name}' was opened`;
    }
    async generateDescriptionForLinksActions(templateId, linkName) {
        const { name } = await prisma_client_1.default.mailTemplate.findUnique({
            where: {
                id: templateId
            }
        });
        return `Link '${linkName} Website' was opened from the email ${name}`;
    }
    generateDescriptionForUnsubscribeAction(email) {
        return `User '${email}' has unsubscribed`;
    }
}
const descriptionGenerator = new DescriptionGenerator();
exports.default = descriptionGenerator;
//# sourceMappingURL=descriptionCreator.js.map