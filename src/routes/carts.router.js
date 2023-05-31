import { Router } from "express";
import { authorize } from "../middlewares/authorization.js";
import { addProductToCart, createCart, deleteAllProductsFromCart, deleteProductFromCart, findAll, findOne, putManyProductsInCart, updateQuantityOfProduct } from "../controllers/cart.controller.js";
const router = Router();

router.get('/', findAll);
router.get('/:cartId', findOne);
router.post('/', createCart);
router.post('/:cartId/products/:productId', authorize(['user']), addProductToCart);
router.delete('/:cartId/products/:productId', authorize(['user']), deleteProductFromCart);
router.delete('/:cartId', authorize(['user']), deleteAllProductsFromCart);
router.put('/:cartId', authorize(['user']), putManyProductsInCart);
router.put('/:cartId/products/:productId', authorize(['user']), updateQuantityOfProduct);

export default router;