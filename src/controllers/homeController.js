import express from "express";

const getHomePage = (req, res) => {
    return res.render('homepage.ejs')
}

export { getHomePage };