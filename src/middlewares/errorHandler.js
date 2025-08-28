import createHttpError from 'http-errors';
import { MongooseError } from 'mongoose';
import multer from 'multer';

export const errorHandler = (err, req, res, next) => {
    if (err.status && typeof err.status === 'number') {
        return res.status(err.status).json({
            status: err.status,
            message: err.message || err.name,
            data: err,
        });
    }

    if (err instanceof multer.MulterError) {
        let message = "File upload error";

        if (err.code === "LIMIT_FILE_SIZE") {
            message = "File too large. Max size is 10MB";
        } else if (err.code === "LIMIT_UNEXPECTED_FILE") {
            message = "Unexpected file field";
        }
        return res.status(400).json({
            status: 400,
            message: `${message}. ${err}`
        });
    }

    if (err instanceof MongooseError) {
        return res.status(500).json({
            status: 500,
            message: 'Database error',
            error: err.message,
        });
    }

    res.status(500).json({
        status: 500,
        message: 'Something went wrong',
        error: err.message,
    });
};
