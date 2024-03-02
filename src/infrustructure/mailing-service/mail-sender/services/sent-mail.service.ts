import { Prisma } from '@prisma/client';

import prismaClient from '../../../../database/prisma-client';


const createRecord = async (data: Prisma.SentMailUncheckedCreateInput) => {
    const sentedmMail = await prismaClient.sentMail.create({ data });

    return sentedmMail;
}

export default {
    createRecord
};