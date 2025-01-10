import { Command, Args } from "@sapphire/framework";
import { Message } from "discord.js";

export class PingCommand extends Command {
  constructor(context: Command.Context, options: Command.Options) {
    super(context, {
      ...options,
      name: "avatar", // Command name
      aliases: ["av"], // Optional aliases
      description: "Gets the avatar of a mentioned user",
    });
  }

  public async messageRun(message: Message, args: Args) {
    const member = await args.pick("member");
    await message.reply(member.displayAvatarURL({ size: 1024 }));
  }
}
