import express from "express";
import { handleUserLogin, handleUserSignUp, handleGetAllDoctors, handleUpdateDoctor, handleCreateNewUser, getAllCodeServices } from "../services/userService";
import { getAllUser, deleteUser } from "../services/CRUDService";
import { compareSync } from "bcryptjs";

const handleLogin = async (req, res) => {
    try {
        console.log('Received login request: ', req.body);
        const email = req.body.email;
        const password = req.body.password;
        console.log('Email: ', email);
        console.log('Password: ', password);

        if (!email || !password) {
            return res.status(500).json({
                errCode: 1,
                message: "Missing inputs parameter!"
            })
        }
        const userData = await handleUserLogin(email, password);
        switch (userData.errCode) {
            case 0: // Login successful
                return res.status(200).json(userData);
            case 2: // User not found
                return res.status(404).json(userData);
            case 4: // Wrong password
                return res.status(401).json(userData);
            default:
                return res.status(400).json(userData);
        }
    } catch (e) {
        return res.status(500).json({
            errCode: -1,
            message: "Error from server!"
        })
    }
}

const handleSignUp = async (req, res) => {
    try {
        console.log('Received sign up request: ', req.body);
        const { email, password, userName } = req.body;
        const user = req.body;
        if (!email || !password || !userName) {
            {
                return res.status(500).json({
                    errCode: 1,
                    message: "Missing inputs parameter!"
                })
            }
        }

        const userData = await handleUserSignUp(user);
        if (userData.errCode === 0) {
            return res.status(200).json(userData);
        } else {
            return res.status(400).json(userData);
        }
    } catch (e) {
        return res.status(500).json({
            errCode: -1,
            message: "Error from server!"
        })
    }
}

const handleFetchAllDoctors = async (req, res) => {
    try {
        const doctors = await getAllUser();
        return res.status(200).json(doctors);
    } catch (e) {
        return res.status(500).json({ errCode: -1, message: "Error from server!" });
    }
}


const handleDeleteDoctor = async (req, res) => {
    try {

        const userId = req.body.userId;
        console.log('check userId at controller: ', userId);
        if (!userId) {
            return res.status(200).json({ errCode: 1, message: "Missing inputs parameter!" });
        }
        const message = await deleteUser(userId);
        return res.status(200).json(message);
    } catch (e) {
        return res.status(500).json({ errCode: -1, message: "Error from server!" });
    }
}

const handleEditDoctor = async (req, res) => {
    const data = req.body;
    console.log('check data at controller: ', data);
    if (!data) {
        return res.status(200).json({ errCode: 1, message: "Missing inputs parameter!" });
    }
    const message = await handleUpdateDoctor(data);
    return res.status(200).json(message);

}

const handleAddNewUser = async (req, res) => {
    try {
        const data = req.body;
        // if (!data) {
        //     return res.status(500).json({
        //         errCode: 1,
        //         message: "Missing input parameter!"
        //     })
        // }
        console.log("Received create req create user: ", data);
        const newUser = await handleCreateNewUser(data);
        console.log(newUser);
        if (newUser.errCode === 0) {
            return res.status(200).json(newUser);
        } else {
            return res.status(400).json(newUser);
        }
    } catch (e) {
        return res.status(500).json({
            errCode: -1,
            message: "Error from server!"
        })
    }
}

const getAllCode = async (req, res) => {
    try {
        let data = await getAllCodeServices(req.query.type);
        return res.status(200).json(data);
    } catch (e) {
        console.log("Error occur!");
        return res.status(200).json({
            errCode: -1,
            message: "Error from server!",
        })
    }
}

export { handleLogin, handleSignUp, handleFetchAllDoctors, handleDeleteDoctor, handleEditDoctor, handleAddNewUser, getAllCode };