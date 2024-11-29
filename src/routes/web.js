import express from "express";
import { getHomePage } from "../controllers/homeController";

const router = express.Router();

const initWebRoutes = (app) => {
    router.get("/", getHomePage);
    return app.use("/", router);
}

export default initWebRoutes;