import { SentMail } from '@prisma/client';
import prismaClient from '../../database/prisma-client';

const addSendedMail = async (mailData: Omit<SentMail, 'id' | "emailStatus">) => {
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