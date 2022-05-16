import { Sora } from "./classes/Sora.js";
import "./lib/setup/index.js";
import { fromAsync, isErr } from "@sapphire/result";
import { utils } from "./lib/utils/utils.js";
import passport from "passport";
import session from "express-session";
import helmet from "helmet";
import { envParseString } from "@skyra/env-utilities";
export const client = new Sora();
async function main() {
    const res = await fromAsync(async ()=>{
        client.logger.info('Logging in...');
        await client.login();
        utils.registerRoutes();
        client.server.api.use(passport.initialize());
        client.server.api.use(session({
            secret: envParseString('COOKIE_SECRET'),
            resave: false,
            saveUninitialized: false
        }));
        client.server.api.use(helmet());
        client.server.api.use(passport.session());
        client.logger.info('Logged in & All routes have been registered!');
    });
    if (isErr(res)) {
        client.logger.fatal(res.error);
        process.exit(1);
    }
}
void main();
