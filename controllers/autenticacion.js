import { response } from 'express';
import bcrypt from 'bcrypt';
import { Usuario } from '../models/user.js';
import jwt from 'jsonwebtoken';
import { enviarMail } from '../helpers/mailer.js';
import { validarJWT } from '../middlewares/autenticacion.js';
import { generarJWT } from '../helpers/token.js';

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
    const token = await generarJWT(user[0].id_user);

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

const existeCorreo = async ( req, res = response ) => {

  try{
    const email = req.body.email;

    const usuario = new Usuario();
    const user = await usuario.obtenerUsuariosPorCorreo(email);

    if(!user){
      return res.status(400).json({error: 'Este Correo no esta registrado'});
      }

    //Generar Token
    const token = jwt.sign({ usuarioId: user[0].id }, 'Token', {expiresIn: '10m'});

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

const cambioContrasena = async ( req, res = response ) => {

  try{

    const { new_password, repeat_password } = req.body;

    const usuario = new Usuario(null, null, null, new_password, null);
    const id_user = req.uid;

    if(new_password != repeat_password){
      return res.status(400).json({error: 'Error las contraseñas no coinciden'});
    }

    const user = await usuario.actualizarContrasena(id_user)
    console.log(user);
    if(!user){
      return res.status(400).json({error: 'Error'});
    }

    const plantilla = 
    `<html>
      <body>
        <h1 style="color: black; text-align: center;">Cambio</h1>
        <p>Se cambio su contraseña, si no es usted no podemos hacer nadad asi que no nos denuncie!</p>
      </body>
    </html>`;

    enviarMail(user.email, 'Cambio de Contraseña', plantilla);

    res.json({message: 'Se envio el Correo'});

  }catch(error){

    console.error('Error al enviar correo: ', error);
    res.status(500).json({error: 'Error al enviar correo'});

  }

};

export { loginUser, existeCorreo, cambioContrasena};