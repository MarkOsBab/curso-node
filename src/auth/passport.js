import passport from "passport";
import GitHubStrategy from "passport-github2";
import userModel from "../dao/models/user.model.js";
import { createHash, isValidPassword } from "../utils.js";
import config from "../config.js";

const { clientID, clientSecret, callbackUrl } = config;

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
                if(!user) {
                    let splitName = profile._json.name.split(" ");
                    let newUser = {
                        first_name: splitName[0],
                        last_name: splitName.slice(1).join(" "),
                        age: 18,
                        email: profile._json.email,
                        password: "",
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
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });
    passport.deserializeUser( async (id, done) => {
        let user = await userModel.findById(id);
        done(null, user);
    });
}

export default initializePassport;