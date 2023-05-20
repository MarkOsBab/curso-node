import { Router } from "express";
import CartManager from "../dao/dbManagers/CartManager.js";
import { addProductToCart, createCart, deleteAllProductsFromCart, deleteProductFromCart, findAll, findOne, putManyProductsInCart, updateQuantityOfProduct } from "../controllers/cart.controller.js";
const router = Router();

router.get('/', findAll);
router.get('/:cartId', findOne);
router.post('/', createCart);
router.post('/:cartId/products/:productId', addProductToCart);
router.delete('/:cartId/products/:productId', deleteProductFromCart);
router.delete('/:cartId', deleteAllProductsFromCart);
router.put('/:cartId', putManyProductsInCart);
router.put('/:cartId/products/:productId', updateQuantityOfProduct);

export default router;