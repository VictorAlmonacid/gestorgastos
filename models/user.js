
import client from '../database/config.js'

class Usuario {
  constructor(id_user, user_nom, email, user_password, createat) {
    this.user = id_user;
    this.nom = user_nom;
    this.email = email;
    this.password = user_password;
    this.fechcreacion = createat;
  }

  async obtenerUsuarios() {
    try {
      await Usuario.connect();
      const result = await db.query('SELECT * FROM usuarios');
      return result.rows;
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
      throw error;
    } finally {
      await db.end();
    }
  }

  // Otras funciones del modelo Usuario...
}

export{
    Usuario
};