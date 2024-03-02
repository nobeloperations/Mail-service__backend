"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cache_1 = __importDefault(require("node-cache"));
const uuid_1 = require("uuid");
const prisma_client_1 = __importDefault(require("../../../../database/prisma-client"));
;
const traking_decorator_1 = __importDefault(require("./traking-decorator"));
const placeholder_replacer_1 = __importDefault(require("./placeholder-replacer"));
const mail_templates_google_service_1 = __importDefault(require("../../../google-services/google-drive/services/mail-templates.google-service"));
;
const templateMailTextCache = new node_cache_1.default({ stdTTL: 900 });
const composeMail = async (contactData, mailTemplateId) => {
    const mailUniqueIdentifier = (0, uuid_1.v5)(`${contactData.id}-${mailTemplateId}-${Date.now()}`, uuid_1.v5.URL);
    const mailTemplateText = await getTemplateMailTextByTemplateId(mailTemplateId);
    const mailTextWithContactData = await placeholder_replacer_1.default.replacePlaceholders(mailTemplateText, contactData);
    const mailTextWithTrakingFeatures = traking_decorator_1.default.decorateMailTextWithNecessaryLinksForTraking(mailTextWithContactData, mailUniqueIdentifier);
    return {
        mailUniqueIdentifier,
        mailText: mailTextWithTrakingFeatures,
    };
};
const getTemplateMailTextByTemplateId = async (mailTemplateId) => {
    if (templateMailTextCache.get(mailTemplateId)) {
        return templateMailTextCache.get(mailTemplateId);
    }
    ;
    const mailTemplateData = await prisma_client_1.default.mailTemplate.findUnique({ where: { id: mailTemplateId } });
    const mailTemplateText = await mail_templates_google_service_1.default.getMailTemplateFileDataById(mailTemplateData.googleDriveFileId);
    templateMailTextCache.set(mailTemplateId, mailTemplateText);
    return mailTemplateText;
};
exports.default = {
    composeMail
};
//# sourceMappingURL=index.js.map