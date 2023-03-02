const express = require('express');
const app = express();
const products = require('./products.json');

app.get('/products', async (req, res) => {
    try {
        res.send({products});
    } catch(err) {
        console.error(`Ocurrió un error al obtener los productos. exception: ${err}`)
    }
});

app.get('/products/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const product = products.find((p) => p.id === id);
        if(!product) res.send(`No se encontró el producto #${req.params.id}`);
        res.send(product);
    } catch(err) {
        console.error(`Ocurrió un error al obtener el producto #${req.params.id}. exception: ${err}`);
    }
});

app.listen(8080, () => {
    console.log("Server runing at port 8080");
});