import { Users } from "@prisma/client";

export {};

declare global {
    interface PaginationOptions {
        page: number;
        pageSize: number;
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