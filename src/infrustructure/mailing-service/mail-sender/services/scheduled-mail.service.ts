import { ScheduledMail } from '@prisma/client';

import prismaClient from '../../../../database/prisma-client';


const deleteRecordById = async (data: ScheduledMail) => {
    const result = await prismaClient.scheduledMail.delete({
        where: {
            id: data.id
        }
    });

    return result;
};

export default {
    deleteRecordById
};