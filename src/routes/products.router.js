import { Router } from "express";
import { uploader } from "../utils.js";
import __dirname from './../utils.js';

import ProductManager from "../controllers/ProductManager.js";

const router = Router();
const URL = "http://localhost:8080/images/";

const productManager = new ProductManager();
const products = await productManager.listProducts();
router.get("/", async (req, res) => {
    try {
        const { limit } = req.query;
        res.send(products.slice(0, limit));
    } catch(err) {
        return res
            .status(500)
            .send({status: `Error`, error: `Internal server error. Exception: ${err}`});
    }
});

router.get("/:id", async (req, res) => {
    try {
        const product = products.find((p) => p.id === parseInt(req.params.id));
        if(!product) return res.status(404).send({status: `Error`, error: `Producto no encontrado.`});
        return res
            .status(200)
            .send(product);
    } catch (err) {
        return res
            .status(500)
            .send({status: `Error`, error: `Internal server error. Exception: ${err}`});
    }
});

router.post("/", uploader.array("thumbnails", 3), async (req, res) => {
    try {
        const thumbnails = req.files ? req.files.map(file => `${URL}${file.filename}`) : null;
        if(!thumbnails) {
            return res
                .status(400)
                .send({status: `Error`, error: `No se pudo cargar ningún archivo.`});
        }

        const product = {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            status: req.body.status,
            code: req.body.code,
            stock: req.body.stock,
            category: req.body.category,
            thumbnails: thumbnails,
        };

        if (products.length === 0) {
            product.id = 1;
        } else {
        const lastProduct = products[products.length - 1];
        if (lastProduct.id === undefined) {
            return res
                .status(400)
                .send({status: `Error`, error: `El último producto en la lista no tiene un ID`});
        }
        product.id = lastProduct.id + 1;
        }

        if(!product.title || !product.description || !product.price || !product.status || !product.code || !product.thumbnails || !product.stock || !product.category) {
            return res
                .status(400)
                .send({status: `Error`, error: `Debes ingresar todos campos para ingresar un nuevo producto.`});
        }

        if(products.some(p => p.code === product.code)) {
            return res
                .status(400)
                .send({status: `Error`, error: `El código ingresado ya existe.`});
        }
        
        productManager.addProduct(product);
        res
            .status(200)
            .send({status: `Success`, response: `Producto creado.`});
    } catch (err) {
        res
            .status(500)
            .send({status: `Error`, error: `Internal server error. Exception: ${err}`});
    }
});

router.put("/:id", uploader.array("thumbnails", 3), async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const product = products.find((p) => p.id === id);

        if(!product) {
            return res
                .status(400)
                .send({status: `Error`, error: `No se encontró el producto con el id #${id}`});
        }

        const thumbnails = req.files ? req.files.map(file => `${URL}${file.filename}`) : null;

        const uploadProduct = {
            id: product.id,
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            status: req.body.status,
            code: req.body.code,
            stock: req.body.stock,
            category: req.body.category,
        };

        if(!uploadProduct.title || !uploadProduct.description || !uploadProduct.price || !uploadProduct.status || !uploadProduct.code || !uploadProduct.stock || !uploadProduct.category) {
            return res
                .status(400)
                .send({status: `Error`, error: `Debes ingresar todos campos para ingresar un nuevo producto.`});
        }

        if(products.some(p => p.code === uploadProduct.code && p.id !== id)) {
            return res
                .status(400)
                .send({status: `Error`, error: `El código ingresado ya existe.`});
        }

        productManager.updateProduct(uploadProduct, id, thumbnails);
        return res
            .status(200)
            .send({status: `Success`, response: `Producto actualizado.`});
    } catch (err) {
        res
            .status(500)
            .send({status: `Error`, error: `Internal server error. Exception: ${err}`});
    }
});

router.delete("/:id", async (req, res) => {
    try{
        const product = products.find((p) => p.id === parseInt(req.params.id));
        if(!product) return res.status(404).send({status: `Error`, error: `Producto no encontrado.`});
        productManager.deleteProduct(product.id);
        return res
            .status(200)
            .send({status: `Success`, response: `Producto eliminado.`});
    } catch(err) {
        return res
            .status(500)
            .send({status: `Error`, error: `Internal server error. Exception: ${err}`});
    }
});

export default router;