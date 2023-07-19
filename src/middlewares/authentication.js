import { apiResponser } from "../traits/ApiResponser.js";

export function authentication(redirect = false) {
    return (req, res, next) => {
        const token = req.cookies.jwtSession;

        if (redirect && !token) return res.redirect('/login');
        if (!token) return apiResponser.errorResponse(res, `Unauthenticated`, 401);

        next();
    }
}