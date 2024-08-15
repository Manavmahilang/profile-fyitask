import NextAuth from "next-auth";
import { UserRole } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string;
      email?: string;
      role?: UserRole;
      isOAuth?: boolean;
    };
  }

  interface JWT {
    sub?: string;
    name?: string;
    email?: string;
    role?: UserRole;
    isOAuth?: boolean;
  }

  // Extend the `AdapterUser` type if necessary
  interface AdapterUser {
    id: string;
    email?: string;
    name?: string;
    role?: UserRole; // Extend this if necessary
    isOAuth?: boolean;
  }
}
