import { Router } from "express";
import indexController from "../controllers/index.js";

const routes = Router();

routes.route('/notebook').get((req, res) => indexController.getNotebooks(req, res));
routes.route('/celulares').get((req,res) => indexController.getCelulares(req, res));
routes.route('/geladeiras').get((req,res) => indexController.getGeladeiras(req, res));
routes.route('/tvs').get((req,res) => indexController.getTvs(req, res));

export default routes;
