"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const client_1 = require("@prisma/client");
const prisma_client_1 = __importDefault(require("../../database/prisma-client"));
const closeExpiredIntakes = async () => {
    const currentDate = (0, moment_1.default)();
    const openedIntakes = await getOpenedIntakes();
    const intakeIdsToClose = openedIntakes
        .filter(processedIntake => (0, moment_1.default)(processedIntake.applicationDeadline).isBefore(currentDate))
        .map(processedIntake => processedIntake.id);
    intakeIdsToClose.length && (await setTargetIntakesStatusToClosed(intakeIdsToClose));
};
const getOpenedIntakes = async () => {
    const result = await prisma_client_1.default.intake.findMany({
        where: {
            status: client_1.IntakeStatus.OPENED
        }
    });
    return result;
};
const setTargetIntakesStatusToClosed = async (intakeIds) => {
    const result = await prisma_client_1.default.intake.updateMany({
        where: {
            id: { in: intakeIds }
        },
        data: {
            status: client_1.IntakeStatus.CLOSED
        }
    });
    return result;
};
exports.default = closeExpiredIntakes;
//# sourceMappingURL=close-expired-intakes.js.map