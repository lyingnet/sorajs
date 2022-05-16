import { client } from "../index.js";
client.server.api.get('/api/test', consoleTest, async (_req, res, next)=>{
    res.on('error', async (err)=>{
        res.json({
            err: err.message
        });
    });
    next();
});
export function consoleTest(req, res, next) {
    if (!req.user) {
        next(new Error("You're not authenticated!"));
    }
    next();
}
