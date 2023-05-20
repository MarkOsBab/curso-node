import { Router } from "express";
import { uploader } from './../utils.js';
import __dirname from "./../utils.js";
import { findAll, findOne, createProduct, updateProduct, deleteProduct } from './../controllers/product.controller.js';

const router = Router();

router.get('/', findAll);
router.get('/:productId', findOne);
router.post('/', uploader.array('thumbnails'), createProduct);
router.put('/:productId', updateProduct);
router.delete('/:productId', deleteProduct);

export default router;