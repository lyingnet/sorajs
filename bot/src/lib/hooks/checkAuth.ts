import type { NextFunction, Response, Request } from "express";

export async function checkAuth(req: Request, res: Response, next: NextFunction) {
    if(req.isAuthenticated()) return next()

    res.sendStatus(401).json({
        err: 'You\'re not authenticated!'
    })
}