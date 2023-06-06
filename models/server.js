import { config } from 'dotenv';
import express from 'express';
import cors from 'cors';
import { conectorDB } from '../database/config.js';
import { router as userRouter } from '../routes/user-ruta.js';
import { router as autRouter} from '../routes/autenticacion.js';

export class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = '/api/user';
    this.autPath = '/api/auth';

    this.clienteDB = null; // Propiedad para almacenar el cliente de la base de datos

    // Middlewares
    this.middlewares();

    // Rutas de mi Aplicación
    this.routes();

    // Conexión a la base de datos
    // this.conectorDB();
  }

  middlewares() {
    // Middleware para configurar CORS, body parser, etc.
    this.app.use(express.json());
  }

  routes() {
    // Configuración de las rutas
    this.app.use(this.usuariosPath, userRouter);
    this.app.use(this.autPath, autRouter);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Server running en el puerto:', this.port);
    });
  }
}

config(); // Cargar las variables de entorno desde el archivo .env