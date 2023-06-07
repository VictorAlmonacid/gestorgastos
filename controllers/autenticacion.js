import { response } from 'express';
import bcrypt from 'bcrypt';
import { conectorDB } from '../database/config.js';
import { Usuario } from '../models/user.js';
import jwt from 'jsonwebtoken';

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

export { loginUser };