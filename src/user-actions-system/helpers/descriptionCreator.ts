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
        return `Link '${linkName} Website' was clicked from the email ${name}`
    }
}

const descriptionGenerator = new DescriptionGenerator()
export default descriptionGenerator