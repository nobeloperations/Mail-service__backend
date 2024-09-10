import { Prisma } from '@prisma/client';

import prismaClient from '../../../../database/prisma-client';


const createRecord = async (data: Prisma.SentMailUncheckedCreateInput) => {
    const result = await prismaClient.sentMail.create({ data });

    return result;
}

export default {
    createRecord
};