import { response } from 'express';
import bcrypt from 'bcrypt';
import { Usuario } from '../models/user.js';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { enviarMail } from '../helpers/mailer.js';

const registerUser = async (req, res) => {
  try {
    const { user_nom, email, user_password } = req.body;

    const usuario = new Usuario(null ,user_nom, email, user_password, new Date());
    const nuevoUsuario = await usuario.crearUsuarios();

    const token = jwt.sign({ usuarioId: nuevoUsuario.id }, 'Token', { expiresIn: '1h' });

    const plantilla = 
    `<html>
      <body>
        <h1 style="color: black; text-align: center;">Bienvenido(a) a nuestra aplicación</h1>
        <p>¡Gracias ${ nuevoUsuario.user_nom } por registrarte!</p>
        <p>Puedes iniciar sesión con tu correo electrónico y contraseña.</p>
      </body>
    </html>`;

    enviarMail(email, 'Confirmación', plantilla);

    res.json({ token, nuevoUsuario });

  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    res.status(500).json({ error: 'Error al registrar el usuario' });
  }

};

const usuariosGet = async (req, res = response) => {
  try {
    const usuario = new Usuario();
    const usuarios = await usuario.obtenerUsuarios();
    res.json(usuarios);
  } catch (error) {
    console.error('Error al obtener la tabla:', error);
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
};

const usuariosGetPorId = async (req, res = response) => {
  try {

    const { id } = req.params;

    const usuario = new Usuario();
    const usuarios = await usuario.obtenerUsuariosPorId(id);
    res.json(usuarios);
  } catch (error) {
    console.error('Error al obtener la tabla:', error);
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
};

const usuariosPut = async (req, res = response) => {
  try {
    const { id } = req.params;
    const { user_nom, email } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Validar en la base de datos
    // ...

    // if (user_password) {
    //   const salt = bcrypt.genSaltSync();
    //   const hashedPassword = bcrypt.hashSync(user_password, salt);
    //   resto.password = hashedPassword;
    //   // No es necesario asignar el hash a "resto.password" si no lo estás utilizando más adelante
    //   }

    const usuario = new Usuario(null, user_nom, email, null, null);
    const usuarioActualizado = await usuario.actualizarUsuario(id);

    res.json(usuarioActualizado);
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
};

const eliminarUsuario = async (req, res = response) => {
  try {
    const { id } = req.params;

    // Validar en la base de datos si el usuario existe
    // ...

    const usuario = new Usuario();
    await usuario.eliminarUsuario(id);

    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    res.status(500).json({ error: "Error al eliminar el usuario" });
  }
};

export { registerUser, usuariosGet, usuariosPut, eliminarUsuario, usuariosGetPorId };