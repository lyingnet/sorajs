import pkg, { PrismaClient } from "@prisma/client";
const PrismaCLient = pkg.PrismaClient;
import { envParseInteger, envParseString } from "@skyra/env-utilities";
import { Client, ClientEvents, Collection } from "discord.js";
import express from "express"
import { Logger } from "../lib/logger/index.js"
import { I18n } from "i18n";
import { fromAsync, isErr} from "@sapphire/result"
import type Listener from "./ListenerClass.js";
import { existsSync, mkdirSync, readdirSync } from "fs";

export class Sora extends Client {
    public events: Collection<string, Listener<keyof ClientEvents>>;
    public readonly db: PrismaClient;
    public readonly server:  {
        api: express.Application;
        listenerOptions: {
            port: number,
            basePath: string
        }
    }
    public logger: Logger
    public i18n: I18n

    constructor() {
        super({
            intents: ['GUILDS', 'GUILD_MESSAGES', 'DIRECT_MESSAGES'],
            partials: ['MESSAGE', 'GUILD_MEMBER', 'REACTION', 'USER'], 
        });

        this.db = new PrismaCLient();
        this.server = {
            api: express(),
            listenerOptions: {
                port: envParseInteger('API_PORT', 3000),
                basePath: '/v1'
            }
        }

        this.logger = new Logger();
        this.i18n = new I18n();
        this.events = new Collection();
        this.loadEvents();

    }

    override async login() {
        const res = await fromAsync(async () => {
            await this.server.api.listen(this.server.listenerOptions.port)
        })

        if(isErr(res)) {
            this.logger.fatal(res.error)
            return process.exit(1)
        }
        return super.login(envParseString('CLIENT_TOKEN'));
    }

    private loadEvents() {
        this.getFiles(`'../../dist/events`, ".js", true)
        .forEach(async (eventFileName) => {
            const eventFile = await import(`../events/${eventFileName}`);
            const event: Listener<keyof ClientEvents> = new eventFile.default(
                this,
                eventFileName.split(".js")[0]
            );
            event.listen();
            return this.events.set(event.name, event);
        });
    }

    public getFiles(
		directory: string,
		fileExtension: string,
		createDirIfNotFound: boolean = false
	): string[] {
		if (createDirIfNotFound && !existsSync(directory)) mkdirSync(directory);
		return readdirSync(directory).filter((file) => file.endsWith(fileExtension));
	}
}