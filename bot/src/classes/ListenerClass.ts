//import type { GuildEmoji, GuildBan, Guild, GuildMember, User, Collection, Snowflake } from "discord.js"
import type { Sora } from "./Sora"

import type { ClientEvents } from "discord.js";

/**
 * export interface CommandRunPayload {
  user?: User;
  member?: GuildMember;
  guild?: Guild;
  ban?: GuildBan;
  emote?: GuildEmoji;
  members?: Collection<Snowflake, GuildMember>;
}
 */

export default abstract class Listener<T extends keyof ClientEvents> {
    private _listener = this._run.bind(this);
    public constructor(public readonly client: Sora, public readonly name: T) {}

    private async _run(...args: ClientEvents[T]) {
        try {
            return this.run(...args);
        } catch (error) {
            this.client.logger.debug(error);
        }
    }

    public abstract run(...args: ClientEvents[T]): Promise<any>

    public listen(once = false) {
        return once ? this.client.once(this.name, this._listener) : this.client.on(this.name, this._listener);
    }

    public removeListener() {
        return this.client.off(this.name, this._listener);
    }
}