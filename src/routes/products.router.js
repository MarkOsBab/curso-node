import { Router } from "express";
import { uploader } from './../utils.js';
import __dirname from "./../utils.js";
import { authorize } from "../middlewares/authorization.js";
import { findAll, findOne, createProduct, updateProduct, deleteProduct } from './../controllers/product.controller.js';

const router = Router();

router.get('/', findAll);
router.get('/:productId', findOne);
router.post('/', authorize(['admin']), uploader.array('thumbnails'), createProduct);
router.put('/:productId', authorize(['admin']), updateProduct);
router.delete('/:productId', authorize(['admin']), deleteProduct);

export default router;