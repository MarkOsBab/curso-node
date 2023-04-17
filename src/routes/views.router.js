import { Router } from 'express';
import ProductManager from "../dao/dbManagers/ProductManager.js";

const router = Router();
const productManager = new ProductManager();

router.get("/products", async (req, res) => {
    const { limit = 10, page = 1, query = "{}", sort = null } = req.query;
  
      const { category, status } = JSON.parse(query);
  
      const filters = {};
      if (category) filters.category = category;
      if (status) filters.status = status;
  
      const options = { limit, page };
      if (sort) options.sort = sort;
  
      const result = await productManager.findAll(page, filters, options);
      const totalPages = result.totalPages;
      const prevPage = result.hasPrevPage ? result.prevPage : null;
      const nextPage = result.hasNextPage ? result.nextPage : null;
      const hasPrevPage = result.hasPrevPage;
      const hasNextPage = result.hasNextPage;
      const prevLink = prevPage ? `/products?limit=${limit}&page=${prevPage}&query=${query}&sort=${sort}` : null;
      const nextLink = nextPage ? `/products?limit=${limit}&page=${nextPage}&query=${query}&sort=${sort}` : null;
      const payload = JSON.parse(JSON.stringify(result.docs));
      res.render("products", {
        payload,
        totalPages,
        prevPage,
        nextPage,
        hasPrevPage,
        hasNextPage,
        prevLink,
        nextLink
      });
    
});


router.get("/product/:productId", async(req, res) => {
    const { productId } = req.params;
    const product = await productManager.findOne(productId);
    res.render("product", {
        product: JSON.parse(JSON.stringify(product))
    });
});

export default router;