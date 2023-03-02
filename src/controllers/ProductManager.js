const fs = require('fs');

class ProductManager {
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
                console.warn('El archivo de productos no existe. Se creará uno nuevo.');
                await this.writeProductsFile([]);
                return [];
            }
        } catch (err) {
            console.error(`Error leyendo el archivo. Exception: ${err}`);
            return [];
        }
    }
    
    writeProductsFile = async (products) => {
        return await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"));
    }

    addProduct = async (product) => {
        try {
            const products = await this.getProductsFromFile();

            if(!product.title || !product.description || !product.price || !product.code || !product.thumbnail || !product.stock) {
                return console.error(`Debes ingresar todos campos para ingresar un nuevo producto.`);
            }

            if(products.some(p => p.code === product.code)) {
                return console.error(`El código ingresado ya existe.`);
            }
            if (products.length === 0) {
                product.id = 1;
            } else {
            const lastProduct = products[products.length - 1];
            if (lastProduct.id === undefined) {
                return console.error('El último producto en la lista no tiene un ID');
            }
            product.id = lastProduct.id + 1;
            }

            products.push(product);
            this.writeProductsFile(products);
            return products;
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
            if(!index) {
                return console.error(`No se encontró el producto con el id #${id}`);
            }
            products.splice(index, 1);
            this.writeProductsFile(products);
            return console.log(products);
        } catch(err) {
            console.error(`Hubo un error al eliminar el producto. Exception: ${err}`);
        }
    }

    updateProduct = async(product, id) => {
        try {
            const products = await this.getProductsFromFile();
            if(!fs.existsSync(this.path))
            {
                return console.error(`Ocurrió un error al obtener el archivo de productos.`);
            }
            let index = products.findIndex(p => p.id === id);
            if(index === -1) {
                return console.error(`No se encontró el producto con el id #${id}`);
            }
            let productToUpdate = products.find((p) => p.id === id);

            let modifiedProduct = {
                title: product.title || productToUpdate.code,
                description: product.description || productToUpdate.description,
                price: product.price || productToUpdate.price,
                code: product.code || productToUpdate.code,
                thumbnail: product.thumbnail || productToUpdate.thumbnail,
                stock: product.stock || productToUpdate.stock,
                id: productToUpdate.id,
            };
            products[index] = modifiedProduct;
            this.writeProductsFile(products);
            return console.log(products);
        } catch(err) {
            console.error(`Hubo un error al actualizar el producto. Exception: ${err}`);
        }
    }
}

const product1 = { title: 'Producto 1', description: 'Producto 1', price: '$2000', thumbnail: 'product1.png', code: 1, stock: 12};
const product2 = { title: 'Producto 2', description: 'Producto 2', price: '$3000', thumbnail: 'product2.png', code: 2, stock: 12};
const product3 = { title: 'Producto 3', description: 'Producto 3', price: '$4000', thumbnail: 'product3.png', code: 3, stock: 12};

const productManager = new ProductManager();

productManager.addProduct(product3);