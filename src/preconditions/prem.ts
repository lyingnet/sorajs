import { Command, Precondition } from "@sapphire/framework";
import type { Message } from "discord.js";

export class TierPrecondition extends Precondition {
  name = "Tier";
  public override async messageRun(message: Message, command: Command) {
    return this.checkTier(message.author.id);
  }
  private async checkTier(userId: string) {
    const res = await this.container.db.premiumUser.findFirst({
      where: {
        userId: userId,
      },
    });

    if (res === null) {
      return this.error({
        message:
          "so i'm pretty sure you're not even in the database yet so let's work on that first",
      });
    }

    if (res!.tier >= 1) {
      return this.ok();
    } else {
      return this.error({ message: "you're not premium lol" });
    }
  }
}

declare module "@sapphire/framework" {
  interface CommandOptions {
    tier?: number; // Add a `tier` option to commands
  }
}
