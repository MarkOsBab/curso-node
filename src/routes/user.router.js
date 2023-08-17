import { Router } from "express";
import { changeRole, deleteUsers, getAll } from "../controllers/user.controller.js";
import { authentication } from "../middlewares/authentication.js";
import { authorize } from "../middlewares/authorization.js";

const router = Router();

router.post('/premium/:id', authentication(), authorize(['admin']), changeRole);
router.get('/', authentication(), authorize(['admin']), getAll);
router.delete('/', authentication(), authorize(['admin']), deleteUsers);

export default router;