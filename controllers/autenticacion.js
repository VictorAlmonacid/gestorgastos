import { response } from 'express';
import bcrypt from 'bcrypt';
import { conectorDB } from '../database/config.js';
import { Usuario } from '../models/user.js';
import jwt from 'jsonwebtoken';
import { enviarMail } from '../helpers/mailer.js';
import { verificarToken } from '../middlewares/autenticacion.js';

const loginUser = async (req, res = response) => {
  try {
    const { email, user_password } = req.body;

    // Verificar si el correo electrónico existe en la base de datos
    const usuario = new Usuario();
    const user = await usuario.obtenerUsuariosPorCorreo(email);
    if (!user) {
        return res.status(400).json({ error: 'Correo electrónico no registrado' });
      }

    // Generar el token de autenticación
    const token = jwt.sign({ email: user[0].email }, 'Token');

    // Comparar la contraseña ingresada con la contraseña almacenada en la base de datos
    const passwordMatch = await bcrypt.compare(user_password, user[0].user_password);
    if (!passwordMatch) {
      return res.status(400).json({ error: 'Credenciales inválidas' });
    }

    // Si las credenciales son válidas, puedes generar un token de autenticación y enviarlo en la respuesta
    // ...

    res.json({ message: 'Inicio de sesión exitoso', token });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};

const existeCorreo = async ( req, res = response )=>{

  try{
    const email = req.body.email;

    const usuario = new Usuario();
    const user = await usuario.obtenerUsuariosPorCorreo(email);

    if(!user){
      return res.status(400).json({error: 'Este Correo no esta registrado'});
      }

    //Generar Token
    const token = jwt.sign({ email: user[0].email }, 'Token', {expiresIn: '10m'});

    const plantilla = 
    `<html>
      <body>
        <h1 style="color: black; text-align: center;">Recuperación</h1>
        <p>Este es tu nuevo Token ${ token } para recuperar Contraseña!</p>
      </body>
    </html>`;

    enviarMail(email, 'Recuperacion de Correo', plantilla);

    res.json({message: 'Se envio el Correo',token});

  }catch(error) {

    console.error('Error al enviar correo: ', error);
    res.status(500).json({error: 'Error al enviar correo'});

  }

};

const tokenValido = async(req, res = response) => {

  try{

    const tokenV = req.header('Token')?.split(' ')[1];
    console.log(tokenV)
    
    const user = await verificarToken(tokenV);
    console.log(user);
    if(!user){
       return res.status(400).json({error:'Este Token caduco'});
    }

    const nuevoToken = jwt.sign({ email: user.email }, 'NuevoToken', {expiresIn: '10m'});

    const plantilla = 
    `<html>
      <body>
        <h1 style="color: black; text-align: center;">Nuevo Token</h1>
        <p>Este es tu nuevo Token ${ nuevoToken } para cambiar Contraseña!</p>
      </body>
    </html>`;

    enviarMail(user.email, 'Nuevo Token', plantilla);

    res.json({message:'Valido',tokenV});

  }catch(error){
    console.error('Token invalido: ', error);
    res.status(500).json({error: 'Token invalido'});
  }

};

export { loginUser, existeCorreo, tokenValido};