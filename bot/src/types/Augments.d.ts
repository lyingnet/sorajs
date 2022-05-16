import type { ArrayString, IntegerString } from "@skyra/env-utilities";
import type { PrismaClient } from "@prisma/client"
import type { Collection } from "discord.js"

declare module '@skyra/env-utilities' {
    interface Env {
      CLIENT_TOKEN: string;
      CLIENT_ID: string;
      CLIENT_PREFIX: string;
      CLIENT_SECRET: string;
      API_PORT: IntegerString;
      CLIENT_PRESENCE_TYPE: string;
      COOKIE_SECRET: string;
      REDIRECT_URI: string;
      DEV_IDS: ArrayString;
      OAUTH_SCOPES: ArrayString;
    }
  }

declare module 'discord.js' {
    interface Client {
        db: PrismaClient;
        cmds: Collection<string, string>;
    }
}