    import { cartRepository } from "../repositories/cart.repository.js";
import { productRepository } from "../repositories/products.repository.js";

    class CartService {
        constructor(){
            this.cartRepository = cartRepository;
            this.productRepository = productRepository;
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
                    const existingProduct = cart.products[existingProductIndex].product;
                    const updatedQuantity = cart.products[existingProductIndex].quantity + parsedQuantity;
                    const stockDifference = cart.products[existingProductIndex].quantity - updatedQuantity;
                    if (existingProduct.stock < stockDifference) {
                        return { error: `No hay suficiente stock del producto.` };
                    }
                    existingProduct.stock -= stockDifference;
                    this.productRepository.saveProduct(existingProduct);
                    cart.products[existingProductIndex].quantity += parsedQuantity;
                } else {
                    const product = await this.productRepository.findOne(productId);
                    if (!product) {
                        return { error: `No se encontró el producto.` };
                    }
                    if (product.stock < parsedQuantity) {
                        return { error: `No hay suficiente stock del producto.` };
                    }
                    product.stock -= parsedQuantity;
                    await this.productRepository.saveProduct(product);

                    cart.products.push({ product: productId, quantity: parsedQuantity });
                }

                await this.cartRepository.saveCart(cart);
                return cart;

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