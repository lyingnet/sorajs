import { Command } from "@sapphire/framework";
import { Message } from "discord.js";

export class PingCommand extends Command {
  constructor(context: Command.Context, options: Command.Options) {
    super(context, {
      ...options,
      name: "ping", // Command name
      aliases: ["p"], // Optional aliases
      description: "Replies with Pong!",
    });
  }

  public async messageRun(message: Message) {
    const sent = await message.reply("baud?");
    const latency = sent.createdTimestamp - message.createdTimestamp;
    const heartbeat = Math.round(this.container.client.ws.ping);

    await sent.edit(
      `🏓 Pong!\nLatency: **${latency}ms**\nAPI Heartbeat: **${heartbeat}ms**`
    );
  }
}
