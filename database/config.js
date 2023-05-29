
import pkg from "pg";
const { Client } = pkg;

const dbConfig = {
  user: 'admin',
  host: '134.122.127.251',
  database: 'GestorGastos',
  password: 'admin123456',
  port: 5432,
};

const client = new Client(dbConfig);

export default client;