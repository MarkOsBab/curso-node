import { userRepository } from "./../repositories/index.js";
import { cartService } from "./../services/index.js";
import { isValidPassword } from "./../utils/utils.js";
import CustomError from "./../errors/CustomError.js";
import { ErrorsName, ErrorsMessage, ErrorsCause } from "./../errors/enums/user.error.enum.js";

export class UserService {
    constructor(){
        this.repository = userRepository;
    }

    login = async (email, password) => {
        try {
            const user = await this.repository.findByEmail(email);
            if(!user) {
                CustomError.generateCustomError({
                    name: ErrorsName.GENERAL_ERROR_NAME,
                    message: ErrorsMessage.NOT_FOUND_MESSAGE,
                    cause: ErrorsCause.NOT_FOUND_CAUSE,
                });
            }
            const validPassword = isValidPassword(user, password);
            if(!validPassword) {
                CustomError.generateCustomError({
                    name: ErrorsName.GENERAL_ERROR_NAME,
                    message: ErrorsMessage.INVALID_CREDENTIALS_MESSAGE,
                    cause: ErrorsCause.INVALID_CREDENTIALS_CAUSE,
                });
            } else {
                delete user.password;
                return user;
            }
        } catch (error) {
            throw new Error(error);
        }
    };

    register = async (user) => {
        try {
            const userExists = await this.repository.findByEmail(user.email);
            if(userExists) {
                CustomError.generateCustomError({
                    name: ErrorsName.GENERAL_ERROR_NAME,
                    message: ErrorsMessage.ALREADY_EXISTS_MESSAGE,
                    cause: ErrorsCause.ALREADY_EXISTS_CAUSE,
                });
            }
            
            return this.repository.createUser(user);

        } catch (error) {
            throw new Error(error);
        }
    };

    authenticateWithGithub = async (profile) => {
        try {
            let user = await this.repository.findByEmail(profile._json.email);
            const cart = await cartService.createCart({products: []});

            if(!user) {
                let splitName = profile._json.name.split(" ");
                let newUser = {
                    first_name: splitName[0],
                    last_name: splitName.slice(1).join(" "),
                    age: 18,
                    email: profile._json.email,
                    password: "",
                    role: "user",
                    cart: cart._id
                };

                return await this.repository.createUser(newUser);
            }

            return user;
        } catch (error) {
            throw new Error(error);
        }
    };

    findById = async (id) => {
        try {
            const user = await this.repository.findById(id);
            if(!user) {
                CustomError.generateCustomError({
                    name: ErrorsName.GENERAL_ERROR_NAME,
                    message: ErrorsMessage.NOT_FOUND_MESSAGE,
                    cause: ErrorsCause.NOT_FOUND_CAUSE,
                });
            }
            return user;
        } catch (error) {
            throw new Error(error);
        }
    };

    changeRole = async (userId) => {
        try {
            const user = await this.repository.findById(userId);
            if(!user) {
                CustomError.generateCustomError({
                    name: ErrorsName.GENERAL_ERROR_NAME,
                    message: ErrorsMessage.NOT_FOUND_MESSAGE,
                    cause: ErrorsCause.NOT_FOUND_CAUSE,
                });
            }
            const role = user.role === 'user' ? user.role = 'premium' : 'user';
            const data = await this.repository.changeRole(user._id, role);
            const response = {
                _id: data._id,
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                age: data.age,
                role: data.role,
                cart: data.cart
            };
            return response;
        } catch (error) {
            throw new Error(error);
        }
    }
}