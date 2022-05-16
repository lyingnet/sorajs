import { envParseArray, envParseString } from "@skyra/env-utilities";
import passport from "passport";
import { Strategy } from "passport-discord";
import { client } from "../../index.js";
const scopes = envParseArray('OAUTH_SCOPES');
passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(obj, done) {
    done(null, obj);
});
passport.use(new Strategy({
    clientID: envParseString('CLIENT_ID'),
    clientSecret: envParseString('CLIENT_SECRET'),
    callbackURL: envParseString('REDIRECT_URI'),
    scope: scopes
}, async function(_accessToken, _refreshToken, profile, done) {
    client.logger.info(profile);
    done(null, profile);
}));
