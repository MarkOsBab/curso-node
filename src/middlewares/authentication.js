import { apiResponser } from "../traits/ApiResponser.js";

export function authentication(redirect = false) {
    return (req, res, next) => {
        if (!req.user) {
            return res.send(`Unauthenticated`);
        }
        if (redirect && !req.user) {
            return res.redirect('/login');
        }

        next();
    }
}