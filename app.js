import { Server } from './models/server.js';
import { config } from 'dotenv';
import { conectorDB } from './database/config.js';

config();

const server = new Server();

server.listen();