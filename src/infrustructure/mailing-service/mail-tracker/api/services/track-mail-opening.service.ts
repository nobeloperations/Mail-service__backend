import { ContactActionType } from '@prisma/client';

import prismaClient from '../../../../../database/prisma-client';

const trackMailOpening = async (sentMailId: string) => {
    const targetRecord = await prismaClient.sentMail.findUnique({ 
        where: { emailId: sentMailId },
        include: {
            template: true
        }
    });

    if (!targetRecord) return;

    const contactActionCreationResult = await prismaClient.contactsActions.create({
        data: {
            actionType: ContactActionType.OPEN_MAIL,
            actionDescription: `Contact was opened mail: ${targetRecord.template.name}`,
            contact: {
                connect: {
                    id: targetRecord.contactId
                }
            }
        }
    }); 

    return contactActionCreationResult;
};

export default {
    trackMailOpening
};

