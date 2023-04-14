import { cartModel } from "../models/cart.model.js";

export default class CartManager {
    constructor(){}
    
    findAll = async () => {
        try {
            return await cartModel.find();
        } catch (error) {
            return {error: error.message};
        }
    };

    findOne = async (id) => {
        try {
            const cart = await cartModel.findOne({_id: id})
                .populate("products.product");
            if(!cart) {
                return {error: `No se encontró el carrito.`};
            }
            return cart;
        } catch (error) {
            return {error: error.message};
        }
    };

    createCart = async() => {
        try {
            const cart = {
                products: [{ product: null, quantity: null }],
            };
            return await cartModel.create({cart});
        } catch (error) {
            return {error: error.message};
        }
    };

    createCartProduct = async (cartId, productId, quantity) => {
        try {
            const cart = await cartModel.findOne({ _id: cartId });
            const parsedQuantity = Number(quantity);
            if (isNaN(parsedQuantity)) {
            return { error: `La cantidad ingresada no es válida.` };
            }
            if (!cart) {
                return { error: `No se encontró el carrito.` };
            }
            const existingProductIndex = cart.products.findIndex(
                (product) => product.product && product.product.toString() === productId
            );
              
            if (existingProductIndex !== -1) {
                cart.products[existingProductIndex].quantity += parsedQuantity;
            } else {
                cart.products.push({ product: productId, quantity: parsedQuantity });
            }

            const updatedCart = await cart.save();
            return updatedCart;
        } catch (error) {
            return {error: error.message};
        }
    };
}