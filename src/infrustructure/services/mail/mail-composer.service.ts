import NodeCache from 'node-cache';
import { Contact } from '@prisma/client';

import prismaClient from '../../../database/prisma-client';
import MailTemplatesGoogleDriveSerive from '../google-services/mail-templates.driver-service';


const templateMailTextCache = new NodeCache({ stdTTL: 900 });
const placeholderMapCollectionCache = new NodeCache({ stdTTL: 900 });

const composeMail  = async (contactData: Contact, mailTemplateId: string) => {
    const mailTemplateText = await getTemplateMailTextByTemplateId(mailTemplateId);
    const formatedMailText = await replacePlaceholders(mailTemplateText, contactData);

    return formatedMailText
};

const getTemplateMailTextByTemplateId = async (mailTemplateId: string): Promise<string> => {
    if (templateMailTextCache.get(mailTemplateId)) {
        return templateMailTextCache.get(mailTemplateId);
    };

    const mailTemplateData = await prismaClient.mailTemplate.findUnique({ where: { id: mailTemplateId } });
    const mailTemplateText = await MailTemplatesGoogleDriveSerive.getMailTemplateFileDataById(mailTemplateData.googleDriveFileId);

    templateMailTextCache.set(mailTemplateId, mailTemplateText);

    return mailTemplateText;
};

const replacePlaceholders = async (mailText: string, contactData: Contact): Promise<string> => {
    const contactDataplaceholderRegex = /%(\w+)%/g;
    const placeholdersData = await getMapCollectionOfContactPlaceholders();

    const formatedMailText = mailText.replace(contactDataplaceholderRegex, (match, placeholder) => {
        const targetContactField = placeholdersData.get(match);

        return placeholdersData.get(match) && contactData.hasOwnProperty(targetContactField)
            ? contactData[targetContactField]
            : match;
    });

    return formatedMailText;
};

const getMapCollectionOfContactPlaceholders = async (): Promise<Map<string, string>> => {
    if (placeholderMapCollectionCache.get('mapCollectionOfContactPlaceholders')) {
        return placeholderMapCollectionCache.get('mapCollectionOfContactPlaceholders');
    }

    const mapCollection = new Map<string, string>();
    const placeholdersData = await prismaClient.contactDataPlacehodelr.findMany();
    
    for (const data of placeholdersData) {
        const { placeholderTag, contactFieldName } = data;

        mapCollection.set(placeholderTag, contactFieldName);
    }

    placeholderMapCollectionCache.set('mapCollectionOfContactPlaceholders', mapCollection);

    return mapCollection;
};


export default {
    composeMail
};