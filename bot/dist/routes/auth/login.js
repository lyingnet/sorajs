import { client } from "../../index.js";
import passport from "passport";
client.server.api.get('/login', passport.authenticate('discord', {
    failureRedirect: '/'
}));
