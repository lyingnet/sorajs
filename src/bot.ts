import { SapphireClient } from "@sapphire/framework";
import { GatewayIntentBits } from "discord.js";
import { PrismaClient } from "@prisma/client";

export class BotClient extends SapphireClient {
  public readonly db: PrismaClient;

  constructor() {
    super({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
      defaultPrefix: "!", // Define your prefix here
      loadMessageCommandListeners: true, // Load message commands
    });

    // Initialize the Prisma client
    this.db = new PrismaClient();
  }
}
