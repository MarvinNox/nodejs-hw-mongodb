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
import { checkPermissToContact } from "../middlewares/checkPermissToContact.js";

const router = Router();

router.use(authenticate);

router.get('/',
    ctrlWrapper(getAllContactsController));

router.get('/:contactId',
    isValidId);

router.get('/:contactId',
    checkPermissToContact,
    ctrlWrapper(getContactByIdController));

router.post('/',
    validateBody(createContactSchema),
    ctrlWrapper(createContactController));

router.patch('/:contactId',
    checkPermissToContact,
    validateBody(updateContactSchema),
    ctrlWrapper(patchContactController));

router.delete('/:contactId',
    checkPermissToContact,
    ctrlWrapper(deleteContactController));

export default router;