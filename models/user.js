import client from '../database/config.js';

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
      const result = await client.query('SELECT * FROM Usuarios');
      return result.rows;
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
      throw error;
    }
  }

  // Otras funciones del modelo Usuario...
}

export {Usuario};