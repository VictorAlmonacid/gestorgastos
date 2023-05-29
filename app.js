import { Server } from './models/server.js';
import { config } from 'dotenv';
import client from './database/config.js';

config();

await client.connect(); // Conecta el cliente a la base de datos

const server = new Server();

server.listen();