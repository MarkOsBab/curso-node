import { productRepository } from "../repositories/products.repository.js";

class ProductService {
    constructor(){
        this.productRepository = productRepository;
    }

    findAll = async (page, filters = {}, options = {}) => {
        try {
          return await this.productRepository.findAll(page, filters, options);
        } catch (error) {
          throw new Error(error.message);
        }
    };

    findOne = async (id) => {
        try {
            return await this.productRepository.findOne(id);
        } catch (error) {
            throw new Error(error.message);
        }
    };
}

export const productService = new ProductService();