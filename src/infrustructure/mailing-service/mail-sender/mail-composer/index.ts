import NodeCache from 'node-cache';
import { v5 as uuidv5 } from 'uuid';

import { Contact } from '@prisma/client';
import prismaClient from '../../../../database/prisma-client';;

import FlagsHanler from './flags-handler/index';
import TrakingDecorator from './traking-decorator';
import PlaceholderReplacer from './placeholder-replacer';

import MailTemplatesGoogleDriveSerive from '../../../google-services/google-drive/services/mail-templates.google-service';;


const templateMailTextCache = new NodeCache({ stdTTL: 90 });

const composeMail  = async (contactData: Contact, mailTemplateId: string, additionalData?: Object, additionalFlags?: Object) => {
    const unsubscribeLink = `${process.env.UNSUBSCRIBE_ROOT_LINK}/${contactData.id}`;
    const mailUniqueIdentifier = uuidv5(`${contactData.id}-${mailTemplateId}-${Date.now()}`, uuidv5.URL);

    const mailTemplateText = await getTemplateMailTextByTemplateId(mailTemplateId);
    const mailTextWithContactData = await PlaceholderReplacer.replacePlaceholders(mailTemplateText, contactData, additionalData);
    const mailTextWithHandeledFlags = FlagsHanler.handleFlags(mailTextWithContactData, additionalFlags);
    const mailTextWithTrakingFeatures = TrakingDecorator.decorateMailTextWithNecessaryLinksForTraking(mailTextWithHandeledFlags, mailUniqueIdentifier);

    return {
        unsubscribeLink,
        mailUniqueIdentifier,
        mailText: mailTextWithTrakingFeatures,
    };
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

export default {
    composeMail
};