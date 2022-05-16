import { envParseArray, envParseString } from "@skyra/env-utilities"

import passport from "passport"
import { Strategy, type Profile  } from "passport-discord"
import { client } from "../../index.js"
import type { VerifyCallback } from "passport-oauth2"


const scopes = envParseArray('OAUTH_SCOPES')

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  passport.deserializeUser(function(obj: any, done) {
    done(null, obj);
  });

passport.use(new Strategy({
    clientID: envParseString('CLIENT_ID'),
    clientSecret: envParseString('CLIENT_SECRET'),
    callbackURL: envParseString('REDIRECT_URI'),
    scope: scopes
},
async function(_accessToken: any, _refreshToken: any, profile: Profile, done: VerifyCallback) {
    client.logger.info(profile)
    done(null, profile)
}));

export interface OAuth2BodyData {
	/**
	 * The code sent by the client.
	 * @since 1.2.0
	 */
	code: string;

	/**
	 * The client's ID.
	 * @since 1.2.0
	 */
	clientId: string;

	/**
	 * The redirect URI.
	 * @since 1.2.0
	 */
	redirectUri: string;
}