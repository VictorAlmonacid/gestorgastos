import express  from 'express';
import cors from 'cors';
import { router as userRouter } from '../routes/user-ruta.js';

export class Server {

    constructor(){

    this.app = express();
    this.port = process.env.PORT;

    this.usuariosPath = '/api/user';
    this.autPath = '/api/auth';

    //Conector de Base de Datos
    this.conectorDB();

    //Middlewares
    this.middlewares();

    //Rutas de mi Aplicación
    this.routes();

    }

    async conectorDB(){
        
    }

    middlewares(){

    }

    routes(){
        this.app.use(this.usuariosPath, userRouter);
    }

    //Hosteo del Server (Puerto)
    listen(){
         this.app.listen(this.port, () => {
            console.log('Server running en el puerto :', this.port);
        });
    }
}