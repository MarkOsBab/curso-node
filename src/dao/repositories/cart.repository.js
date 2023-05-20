import { cartModel } from './../models/cart.model.js';

class CartRepository {
    constructor() {
        this.model = cartModel;
    }

    findAll = async () => {
       try {
        return this.model.find();
       } catch (error) {
        throw new Error(error);
       }
    };

    findOne = async (id) => {
        try {
            return this.model.findById(id);
        } catch (error) {
            throw new Error(error);
        }
    }

    createCart = async (cart) => {
        try {
            return this.model.create(cart);
        } catch (error) {
            throw new Error(error);
        }
    }

    saveCart = async (cart) => {
        try {
            return await cart.save();
        } catch (error) {
            throw new Error(error);
        }
    }
}

export const cartRepository = new CartRepository();