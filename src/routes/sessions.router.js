import { Router } from "express";
import passport from "passport";
import { authorize } from "../middlewares/authorization.js";
import { current, failLogin, failRegister, github, githubCallback, login, logout, register } from "../controllers/session.controller.js";

const router = Router();

router.post(
    '/login',
    passport.authenticate('login', { failureRedirect: '/api/sessions/failLogin' }),
    login
);

router.get("/failLogin", failLogin);

router.post(
    "/register", 
    passport.authenticate("register", 
    { failureRedirect: "/api/sessions/failRegister" }
    ), register);

router.get("/failRegister", failRegister);

router.post("/logout", logout);

router.get("/current", authorize(['user']), current);

router.get(
    "/github", 
    passport.authenticate("github", {scope: ["user:email"]}),
    github
);

router.get(
    "/githubcallback",
    passport.authenticate("github", {failureRedirect: "/login"}),
    githubCallback
);

export default router;