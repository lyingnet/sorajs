import { client } from "../../index.js";
import passport from "passport";
client.server.api.get('/oauth/callback', passport.authenticate('discord', {
    failureRedirect: '/login'
}), async (req, res, next)=>{
    req.session.reload(function(err) {
        req.user;
    });
    res.status(302).redirect('/');
    return next();
});
