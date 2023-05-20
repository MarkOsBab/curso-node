import { productService } from "../dao/services/products.service.js";

export async function findAll (req, res) {
    try {
      const { limit = 10, page = 1, query = "{}", sort = null } = req.query;

      const { category, status } = JSON.parse(query);

      const filters = {};
      if (category) filters.category = category;
      if (status) filters.status = status;

      const options = { limit, page };
      if (sort) options.sort = sort;

      const result = await productService.findAll(page, filters, options);
      const totalPages = result.totalPages;
      const prevPage = result.hasPrevPage ? result.prevPage : null;
      const nextPage = result.hasNextPage ? result.nextPage : null;
      const hasPrevPage = result.hasPrevPage;
      const hasNextPage = result.hasNextPage;
      const prevLink = prevPage ? `/products?limit=${limit}&page=${prevPage}&query=${query}&sort=${sort}` : null;
      const nextLink = nextPage ? `/products?limit=${limit}&page=${nextPage}&query=${query}&sort=${sort}` : null;
      const payload = result.docs;
      if (result && result.error) {
        return res
          .status(400)
          .send({ status: 'Error', error: result.error });
      }
      res.send({
        status: 'success',
        payload,
        totalPages,
        prevPage,
        nextPage,
        page,
        hasPrevPage,
        hasNextPage,
        prevLink,
        nextLink,
      });
    } catch (error) {
      return res.status(500).send(error);
    }
};

export async function findOne(req, res) {
    try {
        const { productId } = req.params;
        const result = await productService.findOne(productId);
        if(result && result.error) {
            return res.status(400).send({status: `Error`, error: result.error});
        }

        return res.status(200).send({status: `Success`, payload: result});
    } catch (error) {
        return res.status(500).send(error);
    }
};