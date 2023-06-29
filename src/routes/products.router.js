import { Router } from "express";
import { uploader } from '../utils/utils.js';
import __dirname from "../utils/utils.js";
import { authentication } from "../middlewares/authentication.js";
import { authorize } from "../middlewares/authorization.js";
import { findAll, findOne, createProduct, updateProduct, deleteProduct, mockingProducts } from './../controllers/product.controller.js';

const router = Router();

router.get('/', findAll);
router.get('/:productId', findOne);
router.post('/', authentication(), authorize(['admin', 'premium']), uploader.array('thumbnails'), createProduct);
router.put('/:productId', authentication(), authorize(['admin', 'premium']), updateProduct);
router.delete('/:productId', authentication(), authorize(['admin', 'premium']), deleteProduct);
router.post("/mockingproducts", mockingProducts);
export default router;