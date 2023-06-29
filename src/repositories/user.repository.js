import { user } from "./../dao/dbManagers/index.js";

export class UserRepository {
    constructor(){
        this.manager = user;
    }

    findByEmail = async (email) => {
        try {
            return await this.manager.findByEmail(email);
        } catch (error) {
            throw new Error(error);
        }
    };

    createUser = async(user) => {
        try {
            return await this.manager.createUser(user);
        } catch (error) {
            throw new Error(error);
        }
    };

    findById = async(id) => {
        try {
            return await this.manager.findById(id);
        } catch (error) {
            throw new Error(error);
        }
    };

    findByCartId = async(cartId) => {
        try {
            return await this.manager.findByCartId(cartId);
        } catch (error) {
            throw new Error(error);
        }
    }

    saveUser = async (user) => {
        try {
            return await this.manager.saveUser(user);
        } catch (error) {
            throw new Error(error);
        }
    }

    changeRole = async (userId, role) => {
        try {
            return await this.manager.changeRole(userId, role);
        } catch (error) {
            throw new Error();
        }
    }
}