export async function checkAuth(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.sendStatus(401).json({
        err: 'You\'re not authenticated!'
    });
}
