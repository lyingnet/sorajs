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
      fetchPrefix: async (message) => {
        if (!message.guild) return "-"; // Default for DMs

        const guildId = message.guild.id;
        const userId = message.author.id;

        // Fetch user and guild data
        const [user, guild] = await Promise.all([
          this.db.premiumUser.findUnique({ where: { userId } }),
          this.db.guildConfig.findUnique({ where: { guildId } }),
        ]);

        // If there is no user create the user
        if (!user) {
          await this.db.premiumUser.create({
            data: {
              userId: message.author.id,
              tier: 0,
              prefix: null,
            },
          });
        }

        // Return user's prefix if premium; otherwise, return guild's prefix
        if (user?.tier >= 1 && user.prefix) {
          return user.prefix;
        }

        return guild?.prefix || "-"; // Fallback to guild prefix or default
      },
      loadMessageCommandListeners: true, // Load message commands
    });

    // Initialize Prisma client
    this.db = new PrismaClient();
  }
}
