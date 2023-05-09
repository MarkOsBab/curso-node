import { Router } from "express";
import userModel from "./../dao/models/user.model.js";
import { isValidPassword } from "../utils.js";
import passport from "passport";

const router = Router();

router.post(
    "/login", 
    passport.authenticate("login", 
    { failureRedirect: "/api/sessions/failLogin" }), 
    async (req, res) => {
    req.session.user = {
        name: `${req.user.first_name} ${req.user.last_name}`,
        email: req.user.email,
        age: req.user.age,
        rol: req.user.role,
        cart: req.user.cartId
    };
    console.log(req.session.user);
    return res.send({status: "success", payload: req.session.user});

});
router.get("/failLogin", (req, res) => {
    res.send({status: "error", error: "Invalid credentials"});
})

router.post(
    "/register", 
    passport.authenticate("register", 
    { failureRedirect: "/api/sessions/failRegister" }
    ), async (req, res) => {
    return res.send({status: "success", payload: "Usuario creado."});
});

router.get("/failRegister", (req, res) => {
    return res.send({status: "error", message: "User already exists"});
});

router.post("/logout", async (req, res) => {
    try {
        req.session.destroy((error) => {
            if(error) {
                res.status(500)
                    .send({status: "error", error: error});
            } else {
                res.redirect('/login');
            }
        });
    } catch(error) {
        res
            .status(500)
            .send({status: "error", error: error});
    }
});

router.get("/current", (req, res) => {
    return res.send({payload: req.session.user});
});

router.get(
    "/github", 
    passport.authenticate("github", {scope: ["user:email"]}),
    async (req, res) => {}
);

router.get(
    "/githubcallback",
    passport.authenticate("github", {failureRedirect: "/login"}),
    async (req, res) => {
        req.session.user = {
            name: `${req.user.first_name} ${req.user.last_name}`,
            email: req.user.email,
            age: req.user.age,
            rol: "user",
        }
        res.redirect("/products");
    }
);

export default router;