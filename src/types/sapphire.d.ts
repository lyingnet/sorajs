import { PrismaClient } from "@prisma/client";

declare module "@sapphire/framework" {
  interface Preconditions {
    Tier: never;
  }
  interface Container {
    db: PrismaClient;
  }
}
