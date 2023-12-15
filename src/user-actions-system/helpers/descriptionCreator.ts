import prismaClient from "../../database/prisma-client"

class DescriptionGenerator {
    constructor() {
    }

    async generateDescriptionForEmailsActions(templateId: string) {
        const { name } = await prismaClient.mailTemplate.findUnique({
            where: {
                id: templateId
            }
        })

        return `Email '${name}' was opened`
    }

    async generateDescriptionForLinksActions(templateId: string, linkName: string) {
        const { name } = await prismaClient.mailTemplate.findUnique({
            where: {
                id: templateId
            }
        })
        return `Link '${linkName} Website' was opened from the email ${name}`
    }

    generateDescriptionForUnsubscribeAction(email: string){
        return `User '${email}' has unsubscribed`
    }
}

const descriptionGenerator = new DescriptionGenerator()
export default descriptionGenerator