import { cartModel } from './../models/cart.model.js';

class CartRepository {
    constructor() {
        this.model = cartModel;
    }

    findAll = async () => {
       try {
        return this.model.find();
       } catch (error) {
        throw new Error(error.message);
       }
    };

    findOne = async (id) => {
        try {
            return this.model.findById(id);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    createCart = async (cart) => {
        try {
            return this.model.create(cart);
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export const cartRepository = new CartRepository();