import pkg from 'pg';

async function conectarAoBancoDeDados() {
  const { Client } = pkg;

  const client = new Client({
    user: process.env.USER_DATABASE,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD_DATABASE,
    port: 5432,
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  });

  try {
    await client.connect();
    console.log('Conexão bem-sucedida ao banco de dados.');
    return client;
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
    throw error;
  }
}

export default conectarAoBancoDeDados;

