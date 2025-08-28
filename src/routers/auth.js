import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
<<<<<<< HEAD
import { loginUserSchema, registerUserSchema } from "../validation/auth.js";
import { loginUserController, logoutUserController, refreshUserSessionController, registerUserController } from "../controllers/auth.js";
=======
import { loginUserSchema, registerUserSchema, requestResetEmailSchema, resetPasswordSchema } from "../validation/auth.js";
import { loginUserController, logoutUserController, refreshUserSessionController, registerUserController, resetPasswordController, sendResetEmailController } from "../controllers/auth.js";
>>>>>>> hw6-email-and-images

const router = Router();

router.post('/register',
    validateBody(registerUserSchema),
    ctrlWrapper(registerUserController));

router.post('/login',
    validateBody(loginUserSchema),
    ctrlWrapper(loginUserController));

router.post('/logout', ctrlWrapper(logoutUserController));
router.post('/refresh', ctrlWrapper(refreshUserSessionController));

<<<<<<< HEAD
=======
router.post('/send-reset-email',
    validateBody(requestResetEmailSchema),
    ctrlWrapper(sendResetEmailController));

router.post('/reset-pwd',
    validateBody(resetPasswordSchema),
    ctrlWrapper(resetPasswordController));

>>>>>>> hw6-email-and-images
export default router;