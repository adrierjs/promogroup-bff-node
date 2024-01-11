import { Router } from "express";
import indexController from "../controllers/index.js";

const routes = Router();

routes.route('/notebook').get((req, res) => indexController.getNotebooks(req, res));
routes.route('/celular').get((req,res) => indexController.getCelulares(req, res));
routes.route('/geladeira').get((req,res) => indexController.getGeladeiras(req, res));
routes.route('/tv').get((req,res) => indexController.getTvs(req, res));
routes.route('/ar-condicionado').get((req,res) => indexController.getArcondicionados(req, res));
routes.route('/livros').get((req,res) => indexController.getLivros(req, res));

export default routes;
