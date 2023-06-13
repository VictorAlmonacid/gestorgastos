import { conectorDB } from '../database/config.js';
import bcrypt from 'bcrypt';

class Usuario {
  
  constructor(id_user, user_nom, email, user_password, createat) {
    this.id_user = id_user;
    this.user_nom = user_nom;
    this.email = email;
    this.user_password = user_password;
    this.createat = createat;
  }

  crearUsuarios = async () => {

    try {
      const client = await conectorDB();
      const query = `
        INSERT INTO usuario (user_nom, email, user_password, createat)
        VALUES ($1, $2, $3, $4)
        RETURNING *
      `;

      const salt = bcrypt.genSaltSync();
      const hashedPassword = bcrypt.hashSync(this.user_password, salt);

      const values = [
        this.user_nom,
        this.email,
        hashedPassword, // Utiliza el hash de la contraseña en lugar de la contraseña original
        this.createat,
      ];

      const result = await client.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error('Error al crear el usuario:', error);
      throw error;
    }

  }

  obtenerUsuarios = async () => {
    try {
      const client = await conectorDB(); // Obtén el cliente de la base de datos
      const result = await client.query('SELECT * FROM usuario'); // Utiliza el método query() del cliente
      return result.rows;
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
      throw error;
    }
  };

  obtenerUsuariosPorId = async (id) => {
    try {
      const client = await conectorDB();
      const result = await client.query('SELECT * FROM usuario WHERE id_user = $1', [id]);
      return result.rows;
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
      throw error;
    }
  };

  obtenerUsuariosPorCorreo = async (email) => {
    try {
      const client = await conectorDB();
      const result = await client.query('SELECT * FROM usuario WHERE email = $1', [email]);
      return result.rows;
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
      throw error;
    }
  };

  actualizarUsuario = async (id) => {
    try {
      const client = await conectorDB();
      const query = `
        UPDATE usuario
        SET user_nom=$1, email=$2
        WHERE id_user=$3
        RETURNING *
      `;
  
      const values = [
        this.user_nom,
        this.email,
        id // Agrega el tercer parámetro 'id' aquí
      ];
  
      const result = await client.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
      throw error;
    }
  };

  eliminarUsuario = async (id) => {
    try {
      const client = await conectorDB();
      const query = `
        DELETE FROM usuario
        WHERE id_user = $1
      `;
      const values = [id];

      await client.query(query, values);
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
      throw error;
    }
  };

  actualizarContrasena = async (id_user) => {
    try{
      const client = await conectorDB ();
      const query = `
        UPDATE usuario
        SET user_password=$1
        WHERE id_user=$2
        RETURNING *
      `;
      
      const values = [
        this.user_password,
        id_user
      ];
      
      const result = await client.query(query, values);
      return result.rows[0];
    }catch(error){
      console.error('Error al cambiar contraseña: ', error);
      throw error;
    }
  };

}

export { Usuario };