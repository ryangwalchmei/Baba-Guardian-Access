import { Router } from "express";
import health from "./health.js";

const routes = Router();

routes.use(health);

export default routes;
