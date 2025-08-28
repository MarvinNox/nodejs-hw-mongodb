import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { getEnvVar } from './utils/getEnvVar.js';
import router from './routers/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import cookieParser from 'cookie-parser';
<<<<<<< HEAD
=======
import { UPLOAD_DIR } from './constants/index.js';
>>>>>>> hw6-email-and-images

const PORT = +(getEnvVar('PORT', '3000'));

export const setupServer = () => {
    const app = express();

<<<<<<< HEAD
    app.use(express.json());
=======
>>>>>>> hw6-email-and-images
    app.use(cors());
    app.use(pino({
        transport: {
            target: 'pino-pretty',
        },
    }));
    app.use(cookieParser());
<<<<<<< HEAD
    app.use(router);
    app.use('/', notFoundHandler);
=======
    app.use(express.json());
    app.use(router);
    app.use('/upload', express.static(UPLOAD_DIR));
    app.use('/', notFoundHandler);


>>>>>>> hw6-email-and-images
    app.use(errorHandler);

    app.listen(PORT, () => {
        console.log(`Server is running on port: ${PORT}`);
    });
};