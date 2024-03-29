import { productModel } from '../models/product.model.js';

export class Product {
    constructor(){
      this.model = productModel;
    }

    getAll = async (page, filters = {}, options = {}) => {
      try {
        const { limit = 10 } = options;
  
        const query = {};
  
        if ('category' in filters) {
          query.category = filters.category;
        }
  
        if ('status' in filters) {
          query.status = filters.status;
        }
  
        const result = await this.model.paginate(query, {
          ...options,
          page: page,
          limit: parseInt(limit),
        });

        return result;
      } catch (error) {
        throw new Error(error);
      }
    };

    findOne = async (id) => {
        try {
          return await this.model.findById(id);
        } catch (error) {
          throw new Error(error);
        }
    };

    addProduct = async (product) => {
      try {
        return await this.model.create(product);
      } catch (error) {
        throw new Error(error);
      }
    };

    findByCode = async (code) => {
      try {
        return await this.model.findOne({ code });
      } catch (error) {
        throw new Error(error);
      }
    };

    updateProduct = async (id, product) => {
      try {
        const updateProduct = await this.model.findByIdAndUpdate(id, product, { new: true });
        return updateProduct;
      } catch (error) {
        throw new Error(error);
      }
    };

    saveProduct = async (product) => {
      try {
          return await product.save();
      } catch (error) {
          throw new Error(error);
      }
    }

    deleteProduct = async (productId) => {
      try {
        const deleteProduct = await this.model.findByIdAndDelete(productId, { new: true });
        return deleteProduct;
      } catch (error) {
        throw new Error(error);
      }
    }

    findWithUserData = async (productId) => {
      try {
        const product = await this.model.findOne({_id: productId});
        product.owner.password = null;
        return product;
      } catch (error) {
        throw new Error(error);
      }
    }
    
}