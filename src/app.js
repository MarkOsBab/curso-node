import express from 'express';
import __dirname from './utils.js';
import productRouter from './routes/products.router.js';
import cartRouter from './routes/cart.router.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/", express.static(`${__dirname}/public`));

app.use("/api/products", productRouter);

app.use("/api/carts", cartRouter);

app.listen(8080, () => {
    console.log("Server runing at port 8080");
});