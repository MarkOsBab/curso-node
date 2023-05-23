import { userModel } from '../models/user.model.js';

class UserRepository {
    constructor(){
        this.model = userModel;
    }

    findByEmail = async (email) => {
        try {
            return await this.model.findOne({email: email});
        } catch (error) {
            throw new Error(error);
        }
    };

    createUser = async(user) => {
        try {
            return await this.model.create(user);
        } catch (error) {
            throw new Error(error);
        }
    };

    findById = async(id) => {
        try {
            return await this.model.findById(id);
        } catch (error) {
            throw new Error(error);
        }
    };
}


export const userRepository = new UserRepository();