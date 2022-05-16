import { client } from "../index.js";
import type { Request, NextFunction, Response } from "express"

client.server.api.get('/api/test', consoleTest, async (_req, res, next) => {
   
})

export function consoleTest(req: Request, res: Response, next: NextFunction) {
    if(!req.user) {
        next(new Error("You're not authenticated!"))
    }
    next();
}