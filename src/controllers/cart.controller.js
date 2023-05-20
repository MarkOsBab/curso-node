import { cartService } from "../dao/services/cart.service.js";
import { apiResponser } from "../traits/ApiResponser.js";

export async function findAll(req, res) {
    try {
        const result = await cartService.findAll();
        if(result && result.error) {
            return apiResponser.errorResponse(res, result.error, 400);
        }
        return apiResponser.successResponse(res, result);

    } catch (error) {
        return apiResponser.errorResponse(res, error);
    }
};

export async function findOne(req, res) {
    try {
        const { cartId } = req.params; 

        const result = await cartService.findOne(cartId);
        if(result && result.error) {
            return apiResponser.errorResponse(res, result.error, 400);
        }

        return apiResponser.successResponse(res, result);
    } catch (error) {
        return apiResponser.errorResponse(res, error);       
    }
};