import fs from 'fs';

export default class ProductManager {
    constructor() {
        this.path = './products.json';
        this.products = [];
    }

    getProductsFromFile = async () => {
        try {
            if (fs.existsSync(this.path)) {
                const file = await fs.promises.readFile(this.path, 'utf-8');
                return JSON.parse(file);
            } else {
                await this.writeProductsFile([]);
                return 'El archivo de productos no existe. Se creará uno nuevo.';
            }
        } catch (err) {
            return `Error leyendo el archivo. Exception: ${err}`;
        }
    }
    
    writeProductsFile = async (products) => {
        return await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"));
    }

    listProducts = async () => {
        try {
            const products = await this.getProductsFromFile();
            return products;
        } catch(err) {
            return `Hubo un error al obtener los productos. Exception: ${err}`;
        }
    }

    addProduct = async (product) => {
        try {
            const products = await this.getProductsFromFile();
            products.push(product);
            this.writeProductsFile(products);
        } catch(err) {
            return console.error(`Hubo un error al añadir un nuevo producto. Exception: ${err}`);
        }
    }

    getProduct = async (id) => {
        try {
            if(fs.existsSync(this.path)) {
                const products = await this.getProductsFromFile();
                let index = products.find((p) => p.id === id);
                if(!index) {
                    return console.error(`No se encontró el producto con el id #${id}`);
                }
                return console.log(index);
            }
        } catch (err) {
            console.error(`Hubo un error al obtener el producto. Exception: ${err}`);
        }
    }

    deleteProduct = async (id) => {
        try {
            const products = await this.getProductsFromFile();
            let index = products.findIndex((p) => p.id === id);

            products.splice(index, 1);
            this.writeProductsFile(products);
        } catch(err) {
            console.error(`Hubo un error al eliminar el producto. Exception: ${err}`);
        }
    }

    updateProduct = async(product, id) => {
        try {
            const products = await this.getProductsFromFile();
            if(!fs.existsSync(this.path))
            {
                return `Ocurrió un error al obtener el archivo de productos.`;
            }
            let productToUpdate = products.find((p) => p.id === id);

            let modifiedProduct = {
                title: product.title || productToUpdate.code,
                description: product.description || productToUpdate.description,
                price: product.price || productToUpdate.price,
                status: product.status || productToUpdate.status,
                code: product.code || productToUpdate.code,
                thumbnail: product.thumbnail || productToUpdate.thumbnail,
                stock: product.stock || productToUpdate.stock,
                category: product.category || productToUpdate.category,
                id: productToUpdate.id,
            };

            products[index] = modifiedProduct;
            this.writeProductsFile(products);
            return products;
        } catch(err) {
            return `Hubo un error al actualizar el producto. Exception: ${err}`;
        }
    }
}