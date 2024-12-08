import express from "express";
import { createUser, getAllUser, getUserById, updateUser, deleteUser } from "../services/CRUDService"
import { handleUserLogin } from "../services/userService";

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

export { handleLogin };