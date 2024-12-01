import express from "express";
import { createUser, getAllUser, getUserById, updateUser } from "../services/CRUDService"

const getHomePage = (req, res) => {
    return res.render('homepage.ejs')
}

const getCRUD = (req, res) => {
    return res.render('crud.ejs')
}

const postCRUD = async (req, res) => {
    const message = await createUser(req.body);
    console.log(message);
    return res.send('post crud to server')
}

const displayGetCRUD = async (req, res) => {
    const data = await getAllUser();
    console.log(data);
    return res.render('displayUser.ejs', { dataTable: data })
}

const getEditCRUD = async (req, res) => {
    const userId = req.query.id;
    if (userId) {
        const userData = await getUserById(userId);
        console.log(userData);
        return res.render("editCRUD.ejs", { userData });
    } else {
        return res.send("User not found!")
    }
}

const putCRUD = async (req, res) => {
    const updateData = req.body;
    console.log(updateData);
    const allUsers = await updateUser(updateData);
    return res.render('displayUser.ejs', { dataTable: allUsers })
}

export { getHomePage, getCRUD, postCRUD, displayGetCRUD, getEditCRUD, putCRUD };