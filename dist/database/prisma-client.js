"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const getPrismaClientInstance = () => {
    if (!global.prismaClient) {
        global.prismaClient = new client_1.PrismaClient();
    }
    return global.prismaClient;
};
const prismaClient = getPrismaClientInstance();
exports.default = prismaClient;
//# sourceMappingURL=prisma-client.js.map