import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";

const router = Router();

router.post('/register', validateBody(), ctrlWrapper());
router.post('/login', validateBody(), ctrlWrapper());
router.post('/logout', validateBody(), ctrlWrapper());
router.post('/refresh', validateBody(), ctrlWrapper());

export default router;