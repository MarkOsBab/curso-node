import { productModel } from '../models/product.model.js';

class ProductRepository {
    constructor(){
        this.model = productModel;
    }

    findAll = async (page, filters = {}, options = {}) => {
        try {
          const { limit = 10 } = options;
    
          const query = {};
    
          if ('category' in filters) {
            query.category = filters.category;
          }
    
          if ('status' in filters) {
            query.status = filters.status;
          }
    
          const result = await productModel.paginate(query, {
            ...options,
            page: page,
            limit: parseInt(limit),
          });
    
          return result;
        } catch (error) {
          throw new Error(error.message);
        }
    };

    findOne = async (id) => {
        return await productModel.findById(id);
    };
}

export const productRepository = new ProductRepository();