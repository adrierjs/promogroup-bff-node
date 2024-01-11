import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import routes from './routers/dataScraping.js';
import conectarAoBancoDeDados from './models/db.js';

dotenv.config();

class App {
  constructor() {
    this.server = express();
    this.server.use(cors());
    this.server.use(express.json());
    this.initialize();
  }

  async initialize() {
    try {
      const client = await conectarAoBancoDeDados();
      this.server.use((req, res, next) => {
        req.clienteBancoDeDados = client;
        next();
      });

      this.server.use(routes);
    } catch (error) {
      console.error('Erro ao conectar ao banco de dados:', error);
    }
  }
}

export default new App().server;
