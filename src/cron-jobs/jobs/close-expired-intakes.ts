import moment from 'moment';
import { IntakeStatus } from '@prisma/client';

import prismaClient from '../../database/prisma-client';


const closeExpiredIntakes = async () => {
    const currentDate = moment();

    const openedIntakes = await getOpenedIntakes();

    const intakeIdsToClose = openedIntakes
        .filter(processedIntake => moment(processedIntake.applicationDeadline).isBefore(currentDate))
        .map(processedIntake => processedIntake.id);

    intakeIdsToClose.length && (await setTargetIntakesStatusToClosed(intakeIdsToClose));
};

const getOpenedIntakes = async () => {
    const result = await prismaClient.intake.findMany({ 
        where: {
            status: IntakeStatus.OPENED
        } 
    });

    return result;
};

const setTargetIntakesStatusToClosed = async (intakeIds: string[]) => {
    const result = await prismaClient.intake.updateMany({ 
        where: {
            id: { in: intakeIds }
        },
        data: {
            status: IntakeStatus.CLOSED
        }
    });

    return result;
};

export default closeExpiredIntakes;