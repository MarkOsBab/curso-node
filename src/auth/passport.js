import passport from "passport";
import GitHubStrategy from "passport-github2";
import userModel from "../dao/models/user.model.js";
import { createHash, isValidPassword } from "../utils.js";
import config from "../config.js";
import local from "passport-local";
import { cartModel } from "../dao/models/cart.model.js";
const { clientID, clientSecret, callbackUrl } = config;
const LocalStrategy = local.Strategy;

const initializePassport = () => {
    passport.use(
        "github",
        new GitHubStrategy({
            clientID,
            clientSecret,
            callbackUrl
        }, async(accessToken, refreshToken, profile, done) => {
            try {
                let user = await userModel.findOne({ email: profile._json.email });
                const cart = await cartModel.create({});
                if(!user) {
                    let splitName = profile._json.name.split(" ");
                    let newUser = {
                        first_name: splitName[0],
                        last_name: splitName.slice(1).join(" "),
                        age: 18,
                        email: profile._json.email,
                        password: "",
                        role: "user",
                        cartId: cart._id
                    };

                    let result = await userModel.create(newUser);
                    return done(null, result);
                }
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        })
    );
    passport.use(
        "register", new LocalStrategy(
            { passReqToCallback: true, usernameField: "email" }, 
            async (req, username, password, done) => {
                try {
                    const { first_name, last_name, role, age } = req.body;
                    const userExists = await userModel.findOne({email: username});
                    if(userExists) {
                        console.error("User already exists");
                        return done(null, false);
                    }

                    const cart = await cartModel.create({});
                    
                    const user = {
                        first_name,
                        last_name,
                        email: username,
                        age: age,
                        password: createHash(password),
                        role: role ?? "user",
                        cart: cart._id,
                    };

                    const result = await userModel.create(user);
                    return done(null, result);
                } catch (error) {
                    return done(error);
                }
            })
    );
    passport.use(
        "login",
        new LocalStrategy({ usernameField: "email" }, async (username, password, done) => {
            try {
                const user = await userModel.findOne({email: username});
                if(!user)
                {
                    console.error("Authentication error");
                    return done(null, false);
                }
                const validPassword = isValidPassword(user, password);
                if(!validPassword) {
                    console.error("Incorrect credentials");
                    return done(null, false);
                } else {
                    delete user.password;
                    return done(null, user);
                }
            } catch (error) {
                return done(error);
            }
        })
    );
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });
    passport.deserializeUser( async (id, done) => {
        let user = await userModel.findById(id);
        done(null, user);
    });
}

export default initializePassport;