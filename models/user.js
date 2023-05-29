import { conectorDB } from '../database/config.js';

class Usuario {
  constructor(id_user, user_nom, email, user_password, createat) {
    this.user = id_user;
    this.nom = user_nom;
    this.email = email;
    this.password = user_password;
    this.fechcreacion = createat;
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
  }

  // Otras funciones del modelo Usuario...
}

export { Usuario };