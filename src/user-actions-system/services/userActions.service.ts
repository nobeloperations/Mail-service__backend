import prismaClient from "../../database/prisma-client"
import { ContactsActions } from "@prisma/client";

const userActions = async (contactId: string, typeOfActivity: string | null) => {
    const objectQuery = typeOfActivity ? { contactId, typeOfActivity: { equals: typeOfActivity as ContactsActions["typeOfActivity"] } } : { contactId };

    return await prismaClient.contactsActions.findMany({
        where: objectQuery
    })
}

export default { userActions }