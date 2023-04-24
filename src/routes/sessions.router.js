import { Router } from "express";
import userModel from "./../dao/models/user.model.js";

const router = Router();

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if(email === "adminCoder@coder.com" && password === "adminCod3r123") {
            req.session.user = {
                name: `Admin Coder`,
                email: email,
                age: null,
                rol: "admin"
            }
        } else {
            const user = await userModel.findOne({email, password});
            if(!user) {
                res
                    .status(400)
                    .send({status: "error", error: "Usuario no encontrado."});
            }
            req.session.user = {
                name: `${user.first_name} ${user.last_name}`,
                email: user.email,
                age: user.age,
                rol: "user",
            }
        }
        return res.send({status: "success", payload: req.session.user});
    } catch (error) {
        res
            .status(500)
            .send({status: "error", error: error});
    }
});

router.post("/register", async (req, res) => {
    try {
        const { first_name, last_name, email, age, password } = req.body;
        const userExists = await userModel.findOne({email});
        if(userExists) {
            return res
                .status(400)
                .send({status: "error", error: "El usuario ya se encuentra registrado."});
        }
        const user = { 
            first_name, 
            last_name, 
            email, 
            age, 
            password 
        };

        await userModel.create(user);
        return res.send({status: "success", payload: "Usuario creado."});
    } catch (error) {
        res
            .status(500)
            .send({status: "error", error: error});
    }
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

export default router;