import { Router } from "express";
import {
    createContactController,
    deleteContactController,
    getAllContactsController,
    getContactByIdController,
    patchContactController
} from "../controllers/contacts.js";
import { isValidId } from "../middlewares/isValidId.js";
import { validateBody } from "../middlewares/validateBody.js";
import { authenticate } from "../middlewares/authenticate.js";
import { createContactSchema, updateContactSchema } from "../validation/contacts.js";
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
<<<<<<< HEAD
=======
import { uploadFile } from "../middlewares/multer.js";
>>>>>>> hw6-email-and-images

const router = Router();

router.use(authenticate);

router.get('/',
    ctrlWrapper(getAllContactsController));

router.get('/:contactId',
    isValidId);

router.get('/:contactId',
    ctrlWrapper(getContactByIdController));

router.post('/',
<<<<<<< HEAD
=======
    uploadFile.single('photo'),
>>>>>>> hw6-email-and-images
    validateBody(createContactSchema),
    ctrlWrapper(createContactController));

router.patch('/:contactId',
<<<<<<< HEAD
=======
    uploadFile.single('photo'),
>>>>>>> hw6-email-and-images
    validateBody(updateContactSchema),
    ctrlWrapper(patchContactController));

router.delete('/:contactId',
    ctrlWrapper(deleteContactController));

export default router;