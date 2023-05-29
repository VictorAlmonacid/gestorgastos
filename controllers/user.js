import { response } from 'express';
import bcrypt from 'bcrypt';
import { Usuario } from '../models/user.js';

const registerUser = async (req, res) => {
  res.json({
    msg: 'Hola Mundo',
  });
};

const usuariosGet = async (req, res = response) => {
  try {
    const usuario = new Usuario(); // Instanciar la clase Usuario sin argumentos
    const usuarios = await usuario.obtenerUsuarios();
    res.json(usuarios);
  } catch (error) {
    console.error('Error al obtener la tabla', error);
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
};

export { registerUser, usuariosGet };