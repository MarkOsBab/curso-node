import express from "express";
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import viewsRouter from './routes/views.router.js';
import productRouter from './routes/products.router.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/", express.static(`${__dirname}/public`));

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbUrl = process.env.DB_URL;
const dbName = process.env.DB_NAME;
const port = process.env.PORT;

const httpServer = app.listen(port, () => {
    console.log(`Server runing at port ${port}`);
});

mongoose.connect(
    `mongodb+srv://${dbUser}:${dbPassword}@${dbUrl}/${dbName}?retryWrites=true&w=majority`
);

app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

app.use("/", viewsRouter);
app.use("/api/products", productRouter);