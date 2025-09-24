import { Sequelize } from 'sequelize';
import mysql from 'mysql2/promise';

const databaseName = process.env.DB_NAME!;

export const mysqlConfig = {
  host: process.env.DB_HOST!,
  user: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  port: parseInt(process.env.DB_PORT!),
};

const PORT = mysqlConfig.port
console.log("🔧 DB Config:", { PORT });

// Espera a que MySQL acepte conexiones (reintentos)
async function waitForDb(maxRetries = 30, delayMs = 1000) {
  for (let i = 1; i <= maxRetries; i++) {
    try {
      const conn = await mysql.createConnection({
        host: mysqlConfig.host,
        user: mysqlConfig.user,
        password: mysqlConfig.password,
        port: mysqlConfig.port,
      });
      await conn.end();
      return;
    } catch (err) {
      console.log(`DB no lista aún (intento ${i}/${maxRetries})…`);
      await new Promise((r) => setTimeout(r, delayMs));
    }
  }
  throw new Error("MySQL no respondió a tiempo");
}

export const createDatabaseIfNotExists = async (): Promise<void> => {
  const connection = await mysql.createConnection(mysqlConfig);
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${databaseName}\`;`);
  console.log(`Database "${databaseName}" verified/created.`);
  await connection.end();
};

export const sequelize = new Sequelize(
  databaseName, 
  mysqlConfig.user, 
  mysqlConfig.password, 
  {
    host: mysqlConfig.host,
    port: mysqlConfig.port,
    dialect: 'mysql',
    logging: false,
  }
);

export const connect = async (): Promise<void> => {
  try {
    await waitForDb();
    await createDatabaseIfNotExists();
    await sequelize.authenticate();
    console.log('Connected to MySQL');
    await sequelize.sync({ alter: false });
  } catch (error) {
    console.error('Error connecting to MySQL:', error);
    throw new Error('Failed to connect to the MySQL database');
  }
};

export const disconnect = async (): Promise<void> => {
  try {
    await sequelize.close();
    console.log('Disconnected from MySQL');
  } catch (error) {
    console.error('Error disconnecting from MySQL:', error);
  }
};