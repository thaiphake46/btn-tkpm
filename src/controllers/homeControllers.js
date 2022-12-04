import express from 'express'
import pool from '../config/connectDB'


let getHomePage = async (req, res) => {

    let [rows, fields] = await pool.execute(
        'SELECT * FROM `login`',
    );
    console.log(rows)
    res.render('index.ejs', { dataUser: JSON.stringify(rows) })
}

let getSigninPage = (req, res) => {
    res.render('signin.ejs')
}

let getSignupPage = (req, res) => {
    res.render('signup.ejs')
}

let getAdminPage = (req, res) => {
    res.render('admin.ejs')
}

let getNewsPage = (req, res) => {
    res.render('news.ejs')
}

module.exports = {
    getHomePage,
    getSigninPage,
    getSignupPage,
    getAdminPage,
    getNewsPage
}