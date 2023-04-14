import { Router } from "express";
import ProductManager from "../dao/dbManagers/ProductManager.js";

const router = Router();
const productManager = new ProductManager();

router.get("/", async (req, res, next) => {
    try {
        const result = await productManager.findAll();
        const { limit } = req.query;
        if(result && result.error) {
            return res
                .status(400)
                .send({status: `Error`, error: result.error});
        }
        res.send({status: "success", payload: result});
    } catch(error) {
        return res
            .status(500)
            .send(next(error));
    }
});

router.get("/:productId", async (req, res, next) => {
    try {
        const { productId } = req.params;
        const result = await productManager.findOne(productId);
        if(result && result.error) {
            return res
                .status(400)
                .send({status: `Error`, error: result.error});
        }
        return res
            .status(200)
            .send({ status: 'success', payload: result });
    } catch (error) {
        return res
            .status(500)
            .send(next(error));
    }
});


router.post("/", async (req, res, next) => {
    try {
        const product = req.body;

        const result = await productManager.addProduct(product);
        if(result && result.error) {
            return res
                .status(400)
                .send({status: `Error`, error: result.error});
        }
        res
            .status(200)
            .send({status: `Success`, response: "Producto creado"});
    } catch (error) {
        return res
            .status(500)
            .send(next(error));
    }
});

router.put("/:productId", async (req, res, next) => {
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
            .send(next(error));
    }
});


router.delete("/:productId", async(req, res, next) => {
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
});

export default router;