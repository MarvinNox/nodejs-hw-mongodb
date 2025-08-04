import { initMongoConnection } from './db/initMongoConnection.js';

await initMongoConnection();
bootstrap();
