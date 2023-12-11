import { Users } from "@prisma/client";

export {};

declare global {
    interface ApiResourceFilteringParams {
        page?: number;
        pageSize?: number;
        search?: string;
    }
    interface Registration {
        name: string;
        password: string;
        email: string;
    }
    interface Login {
        password: string;
        email: string;
    }
    namespace Express {
        interface Request {
          user?: Users;
        }
      }
}