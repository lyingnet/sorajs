import type { GuildEmoji, GuildBan, Guild, GuildMember, User, Collection, Snowflake } from "discord.js"
import type { Sora } from "./Sora"

export abstract class CommandClass {
    /**
     *
     */
    constructor(
        readonly name: string,
        readonly client: Sora
    ) {}
    
    
    public abstract run(user: User | unknown, member: GuildMember | unknown, guild: Guild | unknown, ban: GuildBan | unknown, emote: GuildEmoji | unknown, members: Collection<Snowflake, GuildMember>): unknown | Promise<unknown>;
}