import { Router } from "express";
import ProductManager from "../dao/dbManagers/ProductManager.js";

const router = Router();
const productManager = new ProductManager();

router.get("/", async (req, res) => {
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
            .send(error);
    }
});

router.get("/:productId", async (req, res) => {
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
            .send(error);
    }
});


router.post("/", async (req, res) => {
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