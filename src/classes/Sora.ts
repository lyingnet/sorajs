import pkg from "@prisma/client";
const DBClient = pkg.PrismaClient;
import type { PrismaClient } from "@prisma/client";
import { envParseInteger, envParseString } from "@skyra/env-utilities";
import { Client } from "discord.js";
import Fastify from "fastify";
import type { FastifyInstance } from "fastify";
import { Logger } from "../lib/logger/index.js"
import { I18n } from "i18n";

export class Sora extends Client {
    public readonly db: PrismaClient;
    public readonly server:  {
        api: FastifyInstance;
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

        this.db = new DBClient();
        this.server = {
            api: Fastify({logger: false,}),
            listenerOptions: {
                port: envParseInteger('API_PORT', 3000),
                basePath: '/v1'
            }
        }

        this.logger = new Logger();
        this.i18n = new I18n();

    }

    override async login() {
        try{
            this.server.api.get('/test', async (_req, res) => {
                res.send({
                    message: 'Hello World'
                })
            });
            await this.server.api.listen(this.server.listenerOptions.port);

        } catch (err) {
            console.log(err)
            process.exit();
        }
        return super.login(envParseString('CLIENT_TOKEN'));
    }
}