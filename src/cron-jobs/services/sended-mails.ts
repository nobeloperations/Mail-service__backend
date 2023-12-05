import { ScheduledMail } from '@prisma/client';
import prismaClient from '../../database/prisma-client';

const addSendedMail = async (mailData) => {
    const sendedmMail = await prismaClient.sentMail.create({
        data: {
            ...mailData
        }
    })

    return sendedmMail
}

export default {
    addSendedMail
}