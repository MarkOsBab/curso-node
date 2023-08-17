import { userService } from "../services/index.js";
import { apiResponser } from "../traits/ApiResponser.js";

export async function changeRole(req, res) {
    try {
        const { id } = req.params;
        const result = await userService.changeRole(id);
        return apiResponser.successResponse(res, result);
    } catch (error) {
        return apiResponser.errorResponse(res, error.message);
    }
}

export async function getAll(req, res) {
    try {
        const result = await userService.getAll();
        return apiResponser.successResponse(res, result);
    } catch (error) {
        return apiResponser.errorResponse(res, error.message);
    }
}

export async function deleteUsers(req, res) {
    try {
        const result = await userService.delete();
        return apiResponser.successResponse(res, result);
    } catch (error) {
        return apiResponser.errorResponse(res, error.message);
    }
}

export async function deleteOne(req, res) {
    try {
        const { userId } = req.body;
        const result = await userService.deleteOne(userId);

        return apiResponser.successResponse(res, result);
    } catch (error) {
        return apiResponser.errorResponse(res, error.message);
    }
}