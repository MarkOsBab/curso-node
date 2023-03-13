import fs from 'fs';

export default class CartManager {
    constructor() {
        this.path = './carts.json';
        this.carts = {
            products: []
        };
    }

    getCartsFromFile = async () => {
        try {
            if (fs.existsSync(this.path)) {
                const file = await fs.promises.readFile(this.path, 'utf-8');
                return JSON.parse(file);
            } else {
                await this.writeCartsFile([]);
                return 'El archivo de carritos no existe. Se creará uno nuevo.';
            }
        } catch (err) {
            return `Error leyendo el archivo. Exception: ${err}`;
        }
    }

    writeCartsFile = async (carts) => {
        return await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"));
    }

    listCarts = async () => {
        try {
            const carts = await this.getCartsFromFile();
            return carts;
        } catch(err) {
            return `Hubo un error al obtener los productos. Exception: ${err}`;
        }
    }

    addCart = async (cart) => {
        try {
            const carts = await this.getCartsFromFile();
            carts.push(cart);
            this.writeCartsFile(carts);
        } catch(err) {
            return `Hubo un error al añadir un nuevo carrito. Exception: ${err}`;
        }
    }

    addCartProduct = async (product, id) => {
        try {
          const carts = await this.getCartsFromFile();
          const cartIndex = carts.findIndex((c) => c.id === id);
          const cart = carts[cartIndex];
          const productIndex = cart.products.findIndex((p) => p.id === product.id);
      
          if (productIndex !== -1) {
            cart.products[productIndex].quantity += product.quantity;
          } else {
            cart.products.push({
              id: product.id,
              quantity: product.quantity
            });
          }
          carts[cartIndex] = cart;
          
          await this.writeCartsFile(carts);
        } catch (err) {
          return `Hubo un error al añadir un producto al carrito. Exception ${err}`;
        }
      }
}