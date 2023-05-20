import { cartRepository } from "../repositories/cart.repository.js";

class CartService {
    constructor(){
        this.cartRepository = cartRepository;
    }

    findAll = async () => {
        try {
            return this.cartRepository.findAll();
        } catch (error) {
            throw new Error(error.message);
        }
    };

    findOne = async (id) => {
        try {
            const result = await this.cartRepository.findOne(id);
            if(!result) {
                return { error: 'Carrito no encontrado.' };
            }
            return result;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    createCart = async (cart) => {
        try {
            return this.cartRepository.createCart(cart);
        } catch (error) {
            throw new Error(error.message);      
        }
    };
}

export const cartService = new CartService();