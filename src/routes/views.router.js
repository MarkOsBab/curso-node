import { Router } from 'express';
import ProductManager from "../dao/dbManagers/ProductManager.js";
import CartManager from "../dao/dbManagers/CartManager.js";

const router = Router();
const productManager = new ProductManager();
const cartManager = new CartManager();

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
        nextLink,
        user: req.session.user
      });
    
});


router.get("/product/:productId", async(req, res) => {
    const { productId } = req.params;
    const product = await productManager.findOne(productId);
    res.render("product", {
        product: JSON.parse(JSON.stringify(product))
    });
});

router.get("/cart/:cartId", async(req, res) => {
  const { cartId } = req.params;
  const cart = await cartManager.findOne(cartId);
  res.render("cart", {
    cart: JSON.parse(JSON.stringify(cart.products))
  });
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/profile", (req, res) => {
    res.render("profile", { user: req.session.user });
});

export default router;