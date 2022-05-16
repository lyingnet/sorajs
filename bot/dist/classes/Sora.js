import pkg from "@prisma/client";
const PrismaCLient = pkg.PrismaClient;
import { envParseInteger, envParseString } from "@skyra/env-utilities";
import { Client, Collection } from "discord.js";
import express from "express";
import { Logger } from "../lib/logger/index.js";
import { I18n } from "i18n";
import { fromAsync, isErr } from "@sapphire/result";
import { existsSync, mkdirSync, readdirSync } from "fs";
export class Sora extends Client {
    constructor(){
        super({
            intents: [
                'GUILDS',
                'GUILD_MESSAGES',
                'DIRECT_MESSAGES'
            ],
            partials: [
                'MESSAGE',
                'GUILD_MEMBER',
                'REACTION',
                'USER'
            ]
        });
        this.db = new PrismaCLient();
        this.server = {
            api: express(),
            listenerOptions: {
                port: envParseInteger('API_PORT', 3000),
                basePath: '/v1'
            }
        };
        this.logger = new Logger();
        this.i18n = new I18n();
        this.events = new Collection();
        this.loadEvents();
    }
    async login() {
        const res = await fromAsync(async ()=>{
            await this.server.api.listen(this.server.listenerOptions.port);
        });
        if (isErr(res)) {
            this.logger.fatal(res.error);
            return process.exit(1);
        }
        return super.login(envParseString('CLIENT_TOKEN'));
    }
    loadEvents() {
        this.getFiles(`'../../dist/events`, ".js", true).forEach(async (eventFileName)=>{
            const eventFile = await import(`../events/${eventFileName}`);
            const event = new eventFile.default(this, eventFileName.split(".js")[0]);
            event.listen();
            return this.events.set(event.name, event);
        });
    }
    getFiles(directory, fileExtension, createDirIfNotFound = false) {
        if (createDirIfNotFound && !existsSync(directory)) mkdirSync(directory);
        return readdirSync(directory).filter((file)=>file.endsWith(fileExtension)
        );
    }
}
