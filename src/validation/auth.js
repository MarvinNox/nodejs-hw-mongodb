import Joi from "joi";

export const registerUserSchema = Joi.object(
    {
        name: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(3).max(30).required(),
        // .regex(/.*[A-Z].*/, { name: 'One uppercase' })
        // .regex(/.*[a-z].*/)
        // .regex(/^(?=.*[@#$%^&*()]).+$/),
    }
);

export const loginUserSchema = Joi.object(
    {
        email: Joi.string().email().required(),
        password: Joi.string().min(3).max(30).required(),
    }
);