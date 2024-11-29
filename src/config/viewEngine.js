import express from "express";
import path from "path";

const configViewEngine = (app) => {
    app.use(express.static("./src/public"));
    app.set('views', path.join(__dirname, '../views'));
    app.set("view engine", "ejs");
}

export default configViewEngine;