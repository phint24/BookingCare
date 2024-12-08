import express from "express";
import { getHomePage, getCRUD, postCRUD, displayGetCRUD, getEditCRUD, putCRUD, deleteCRUD } from "../controllers/homeController";
import { handleLogin } from "../controllers/userController";
const router = express.Router();

const initWebRoutes = (app) => {
    router.get("/", getHomePage);
    router.get("/crud", getCRUD)

    router.post("/post-crud", postCRUD);
    router.get("/get-crud", displayGetCRUD);
    router.get("/edit-crud", getEditCRUD);

    router.post("/put-crud", putCRUD);
    router.get("/delete-crud", deleteCRUD);

    router.post("/api/login", handleLogin);

    return app.use("/", router);
}

export default initWebRoutes;