/**
 * export interface CommandRunPayload {
  user?: User;
  member?: GuildMember;
  guild?: Guild;
  ban?: GuildBan;
  emote?: GuildEmoji;
  members?: Collection<Snowflake, GuildMember>;
}
 */ export default class Listener {
    constructor(client, name){
        this.client = client;
        this.name = name;
        this._listener = this._run.bind(this);
    }
    async _run(...args) {
        try {
            return this.run(...args);
        } catch (error) {
            this.client.logger.debug(error);
        }
    }
    listen(once = false) {
        return once ? this.client.once(this.name, this._listener) : this.client.on(this.name, this._listener);
    }
    removeListener() {
        return this.client.off(this.name, this._listener);
    }
};
