import { config } from 'dotenv';
import express from 'express';
import cors from 'cors';
import { conectorDB } from '../database/config.js';
import { router as userRouter } from '../routes/user-ruta.js';

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

  // async conectorDB() {
  //   try {
  //     this.clienteDB = await conectorDB();
  //     console.log('Conexión a la base de datos exitosa');
  //   } catch (error) {
  //     console.error('Error al conectar con la base de datos:', error);
  //     throw error;
  //   }
  // }

  middlewares() {
    // Middleware para configurar CORS, body parser, etc.
  }

  routes() {
    // Configuración de las rutas
    this.app.use(this.usuariosPath, userRouter);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Server running en el puerto:', this.port);
    });
  }
}

config(); // Cargar las variables de entorno desde el archivo .env