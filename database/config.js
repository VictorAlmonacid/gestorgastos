import pkg from "pg";
const { Client } = pkg;

const dbConfig = {
  user: 'admin',
  host: '134.122.127.251',
  database: 'GestorGastos',
  password: 'admin123456',
  port: 5432,
};


// Crea una nueva instancia del cliente de PostgreSQL
const client = new Client(dbConfig);

// Función para conectar a la base de datos y devolver el cliente
function conectorDB() {
  return client.connect()
    .then(() => {
      // Realiza las operaciones necesarias después de la conexión
      console.log('Conectado a la base de datos');
      return client; // Devuelve el cliente
    })
    .catch((err) => {
      // Maneja cualquier error de conexión
      console.error('Error al conectar a la base de datos:', err);
      throw err;
    });
}

export { conectorDB };