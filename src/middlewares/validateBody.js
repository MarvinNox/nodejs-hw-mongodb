import createHttpError from "http-errors";

export const validateBody = (schema) => async (req, res, next) => {
    try {
        await schema.validateAsync(req.body, {
            abortEarly: false,
            allowUnknown: false,
<<<<<<< HEAD
            convert: false,
=======
            convert: true,
>>>>>>> hw6-email-and-images
        });
        next();
    } catch (err) {
        const error = createHttpError(400, 'Bad Request', {
            error: err.details,
        });
        next(error);
    };
};