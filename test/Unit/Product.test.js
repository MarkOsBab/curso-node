import chai from "chai";
import mongoose from "mongoose";
import config from "./../../src/config/config.js";
import { Product } from "./../../src/dao/dbManagers/Product.js";
import { ProductsMock } from "../mocks/products.mock.js";

const expect = chai.expect;

const { mongo: { dbTestUrl } } = config;

describe("Set de pruebas del modulo de productos", () => {
    before(function() {
        mongoose.connect(dbTestUrl);
        this.productDao = new Product();
        this.productMock = new ProductsMock();
    });
    beforeEach(function() {
        mongoose.connection.collections.products.drop();
    });
    after(function() {
        mongoose.connection.close(true);
    });

    it("El dao debe retornar productos en un array", async function() {
        const page = 1;
        const filters = { category: "electronics", status: 1 };
        const options = { limit: 10 };
    
        const result = await this.productDao.getAll(page, filters, options);
        expect(result.docs).to.be.a("array");
    });

    it("El dao debe crear un producto", async function() {
        const productMock = this.productMock.product();
        const result = await this.productDao.addProduct(productMock);

        expect(result).to.be.a("object");
        expect(result).to.be.ok;
        expect(result).to.have.property("_id");
    });

    it("El dao debe ver un producto", async function() {
        const productMock = this.productMock.product();

        const product = await this.productDao.addProduct(productMock);
        const result = await this.productDao.findOne(product._id);

        expect(result).to.be.a("object");
        expect(result).to.be.ok;
        expect(result).to.have.property("_id");
    });

    it("El dao debe actualizar un producto", async function() {
        const productMock = this.productMock.product();

        const product = await this.productDao.addProduct(productMock);
        
        const productToUpdate = this.productMock.product();

        const result = await this.productDao.updateProduct(product._id, productToUpdate);

        expect(result).to.be.ok;
        expect(result.title).to.be.equal(productToUpdate.title);
    });

    it("El dao debe retornar un producto por el codigo", async function() {
        const productMock = this.productMock.product();
        const product = await this.productDao.addProduct(productMock);
        const result = await this.productDao.findByCode(product.code);

        expect(result).to.be.ok;
        expect(result).to.have.property("_id");
    });

    it("El dao debe eliminar un producto", async function() {
        const productMock = this.productMock.product();

        const product = await this.productDao.addProduct(productMock);
        const deleteProduct = await this.productDao.deleteProduct(product._id);

        expect(deleteProduct).to.be.a("object");
        const findProduct = await this.productDao.findOne(product._id);

        expect(findProduct).to.be.null;
    });
});