import createHttpError from "http-errors";
import { ContactsCollection } from "../db/models/contact.js";
import { Types } from "mongoose";


export const checkPermissToContact = async (req, res, next) => {
    const { contactId } = req.params;

    if (!Types.ObjectId.isValid(contactId)) {
        return next(createHttpError(400, "Invalid contact ID"));
    }

    const contact = await ContactsCollection.findById(contactId);

    if (!contact) {
        return next(createHttpError(404, "Contact not found"));
    }

    if (!contact.userId.equals(req.user._id)) {
        return next(createHttpError(403, "You are not allowed to access this contact"));
    }


    next();
};