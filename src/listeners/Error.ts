import type { Message } from "discord.js";
import {
  Listener,
  Events,
  type ListenerOptions,
  type UserError,
} from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";

@ApplyOptions<ListenerOptions>({
  event: Events.MessageCommandDenied, // Listen for MessageCommandDenied events
})
export class UserListener extends Listener<typeof Events.MessageCommandDenied> {
  public async run(error: UserError, { message }: { message: Message }) {
    // Reply to the user with the error message
    await message.reply(error.message);
  }
}
