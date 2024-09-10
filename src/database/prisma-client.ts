import { PrismaClient } from '@prisma/client';

declare global {
  var prismaClient: PrismaClient;
}
  
const getPrismaClientInstance = (): PrismaClient => {
  if (!global.prismaClient) {
    global.prismaClient = new PrismaClient();
  }
  
  return global.prismaClient;
};
  
const prismaClient: PrismaClient = getPrismaClientInstance();
  
export default prismaClient;