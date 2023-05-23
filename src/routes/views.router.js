import { Router } from 'express';
import { getProducts, login, profile, register, viewCart, viewProduct } from '../controllers/view.controller.js';

const router = Router();

router.get("/products", getProducts);
router.get("/product/:productId", viewProduct);
router.get("/cart/:cartId", viewCart);
router.get("/register", register);
router.get("/login", login);
router.get("/profile", profile);

export default router;