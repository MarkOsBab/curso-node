import { cart } from './../dao/dbManagers/index.js';

export class CartRepository {
    constructor() {
        this.manager = cart;
    }

    findAll = async () => {
       try {
        return this.manager.findAll();
       } catch (error) {
        throw new Error(error);
       }
    };

    findOne = async (id) => {
        try {
            return this.manager.findOne(id);
        } catch (error) {
            throw new Error(error);
        }
    }

    createCart = async (cart) => {
        try {
            return this.manager.createCart(cart);
        } catch (error) {
            throw new Error(error);
        }
    }

    saveCart = async (cart) => {
        try {
            return await this.manager.saveCart(cart);
        } catch (error) {
            throw new Error(error);
        }
    }
}