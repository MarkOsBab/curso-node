import { Router } from "express";
import { uploader } from './../utils.js';
import __dirname from "./../utils.js";
import ProductManager from "../dao/dbManagers/ProductManager.js";
import { findAll, findOne } from './../controllers/product.controller.js';

const router = Router();
const productManager = new ProductManager();
const URL = "http://localhost:8080/images/";

router.get('/', findAll);
  
router.get('/:productId', findOne);


router.post("/", uploader.array('thumbnails'), async (req, res) => {
    try {
        const product = req.body;
        const thumbnails = req.files ? req.files.map(file => `${URL}${file.filename}`) : null;

        if(!thumbnails) {
            return res
                .status(400)
                .send({status: `Error`, error: `No se pudo cargar ningún archivo.`});
        }
        product.thumbnails = thumbnails;
        const result = await productManager.addProduct(product);
        if(result && result.error) {
            return res
                .status(400)
                .send({status: `Error`, error: result.error});
        }
        res
            .status(200)
            .send({status: `Success`, payload: "Producto creado"});
    } catch (error) {
        return res
            .status(500)
            .send(errors);
    }
});

router.put("/:productId", async (req, res) => {
    try {
        const { productId } = req.params;
        const product = req.body;

        const result = await productManager.updateProduct(productId, product);

        if(result && result.error) {
            return res
                .status(400)
                .send({status: `Error`, error: result.error});
        }
        
        return res
                .status(200)
                .send({ status: 'success', payload: "Producto actualizado." });
    } catch (error) {
        return res
            .status(500)
            .send(error);
    }
});


router.delete("/:productId", async(req, res) => {
    try {
        const { productId } = req.params;
    
        const result = await productManager.deleteProduct(productId);

        if(result && result.error) {
            return res
                .status(400)
                .send({status: `Error`, error: result.error});
        }
        
        return res
                .status(200)
                .send({ status: 'success', payload: "Producto eliminado." });
    } catch (error) {
        return res
            .status(500)
            .send(error);
    }
});

export default router;