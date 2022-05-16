import type { CommandInteraction} from "discord.js"
import type { Sora } from "./Sora"

export abstract class CommandClass {
    constructor(
        readonly name: string,
        description: string,
        category: string[],
        readonly client: Sora
      ) { }
      public abstract run(interaction: CommandInteraction | unknown, args: string[] | unknown): unknown | Promise<unknown>;
    };