import { cartRepository } from "../repositories/cart.repository.js";

class CartService {
    constructor(){
        this.cartRepository = cartRepository;
    }

    findAll = async () => {
        try {
            return this.cartRepository.findAll();
        } catch (error) {
            throw new Error(error);
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
            throw new Error(error);
        }
    };

    createCart = async (cart) => {
        try {
            return this.cartRepository.createCart(cart);
        } catch (error) {
            throw new Error(error);      
        }
    };

    addProductToCart = async (id, productId, quantity = 1) => {
        try {
            const cart = await this.cartRepository.findOne(id);
            const parsedQuantity = Number(quantity);
            if (isNaN(parsedQuantity)) {
                return { error: `La cantidad ingresada no es válida.` };
            }

            if (!cart) {
                return { error: `No se encontró el carrito.` };
            }

            const existingProductIndex = cart.products.findIndex(
                (product) => product.product && product.product._id.toString() === productId
            );

            if (existingProductIndex !== -1) {
                cart.products[existingProductIndex].quantity += parsedQuantity;
            } else {
                cart.products.push({ product: productId, quantity: parsedQuantity });
            }

            return await this.cartRepository.saveCart(cart);

        } catch (error) {
            throw new Error(error);
        }
    };

    deleteProductFromCart = async (id, productId) => {
        try {
            const cart = await this.cartRepository.findOne(id);
            if(!cart) {
                return {error: `No se encontró el carrito.`};
            }
            const productIndex = cart.products.findIndex(
                product => product._id === productId
            );
            cart.products.splice(productIndex, 1);

            return await this.cartRepository.saveCart(cart);

        } catch (error) {
            throw new Error(error);
        }
    };

    deleteAllProductsFromCart = async (id) => {
        try {
            const cart = await this.cartRepository.findOne(id);
            if(!cart) {
                return {error: `No se encontró el carrito.`};
            }
            cart.products = [];
            return await this.cartRepository.saveCart(cart);
        } catch (error) {
            throw new Error(error);
        }
    };

    putManyProductsInCart = async (id, products) => {
        try {
            const cart = await this.cartRepository.findOne(id);
            if(!cart) {
                return {error: `No se encontró el carrito.`};
            }
            cart.products = products;
            return await this.cartRepository.saveCart(cart);
            
        } catch (error) {
            throw new Error(error);
        }
    };

    updateQuantityOfProduct = async (id, productId, quantity) => {
        try {
            const cart = await this.cartRepository.findOne(id);
            if(!cart) {
                return { error: `No se encontró el carrito.`};
            }

            const product = cart.products.find((product) => product.product._id.toString() === productId.toString());
            if (!product) {
                return { error: `Producto con ID ${productId} no encontrado en el carrito` };
            }
            
            product.quantity = quantity;
            return await this.cartRepository.saveCart(cart);

        } catch (error) {
            throw new Error(error);
        }
    };
};

export const cartService = new CartService();