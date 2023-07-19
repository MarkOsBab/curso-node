import jwt from "jsonwebtoken";
import { apiResponser } from "../traits/ApiResponser.js";
import { userService } from "./../services/index.js";
import config from "../config/config.js";

const {
    session: {
        sessionSecret
    }
} = config;

export function authorize(roles) {
    return async (req, res, next) => {
        const token = req.cookies.jwtSession;

        if (!token) {
            return apiResponser.errorResponse(res, "Acceso denegado. No se proporcionó un token.", 401);
        }

        try {
            const decodedToken = jwt.verify(token, sessionSecret);
            const currentUser = await userService.findById(decodedToken.userId);
            const hasPermission = roles.some(role => currentUser.role === role);

            if (!hasPermission) {
                return apiResponser.errorResponse(res, "No tienes permiso para realizar esta acción.", 403);
            }

            req.session.user = currentUser;

            next();
        } catch (error) {
            return apiResponser.errorResponse(res, "Token inválido o expirado. " +error.message, 401);
        }
    };
}
