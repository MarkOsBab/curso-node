import { Router } from "express";
import CartManager from "../dao/dbManagers/CartManager.js";

const router = Router();
const cartManager = new CartManager();

router.get("/", async (req, res) => {
    try {
        const result = await cartManager.findAll();
        if(result && result.error) {
            return res
                .status(400)
                .send({status: `Error`, error: result.error});
        }
        res
            .status(200)
            .send({status: `Success`, payload: result});
    } catch (error) {
        return res
            .status(500)
            .send(error);
    }
});

router.get("/:cartId", async (req, res) => {
    try {
        const { cartId } = req.params;
        const result = await cartManager.findOne(cartId);
        if(result && result.error) {
            return res
                .status(400)
                .send({status: `Error`, error: result.error});
        }
        res
            .status(200)
            .send({status: `Success`, payload: result});
    } catch (error) {
        return res
            .status(500)
            .send(error);
    }
});

router.post("/", async (req, res) => {
    try {
        const result = await cartManager.createCart();
        if(result && result.error) {
            return res
                .status(400)
                .send({status: `Error`, error: result.error});
        }
        res
            .status(200)
            .send({status: `Success`, payload: {id: result._id, message: "Carrito creado"}});
    } catch (error) {
        return res
            .status(500)
            .send(error);
    }
});

router.post("/:cartId/products/:productId", async (req, res) => {
    try {
        const {cartId, productId} = req.params;
        const { quantity } = req.body;
        
        const result = await cartManager.createCartProduct(cartId, productId, quantity);
        if(result && result.error) {
            return res
                .status(400)
                .send({status: `Error`, error: result.error});
        }
        res
            .status(200)
            .send({status: `Success`, payload: "Producto agregado al carrito"});
    } catch (error) {
        return res
            .status(500)
            .send(error);
    }
});

router.delete("/:cartId/products/:productId", async (req, res) => {
    try {
        const { cartId, productId } = req.params;
        const result = await cartManager.deleteProductFromCart(cartId, productId);
        if(result && result.error) {
            return res
                .status(400)
                .send({status: `Error`, error: result.error});
        }
        res
            .status(200)
            .send({status: `Success`, payload: "Producto eliminado del carrito."});
    } catch (error) {
        return res
            .status(500)
            .send(error);
    }
});

router.delete("/:cartId", async (req, res) => {
    try {
        const { cartId } = req.params;
        const result = await cartManager.deleteAllProducts(cartId);
        if(result && result.error) {
            return res
                .status(400)
                .send({status: `Error`, error: result.error});
        }
        res
            .status(200)
            .send({status: `Success`, payload: "Carrito vaciado con éxito."});
    } catch (error) {
        return res
            .status(500)
            .send(error);
    }
});

router.put("/:cartId", async (req, res) => {
    try {
        const { cartId } = req.params;
        const products = req.body;
        const result = await cartManager.updateManyProducts(cartId, products);
        if(result && result.error) {
            return res
                .status(400)
                .send({status: `Error`, error: result.error});
        }
        res
            .status(200)
            .send({status: `Success`, payload: "Productos agregados con éxito."});
    } catch (error) {
        return res
            .status(500)
            .send(error);
    }
});

router.put("/:cartId/products/:productId", async (req, res) => {
    try {
        const { cartId, productId } = req.params;
        const { quantity } = req.body;
        const result = await cartManager.updateQuantityOfProductInCart(cartId, productId, quantity);
        if(result && result.error) {
            return res
                .status(400)
                .send({status: `Error`, error: result.error});
        }
        res
            .status(200)
            .send({status: `Success`, payload: "Productos agregados con éxito."});
    } catch (error) {
        return res
        .status(500)
        .send(error);
    }
});

export default router;