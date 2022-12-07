import express from 'express'
import pool from '../config/connectDB'


let getAboutPage = (req, res) => {
    res.render('about.ejs', {
        title: 'About Page',
        layout: 'layouts/sidebar.ejs'
    })
}

let getHomePage = async (req, res) => {
    let [rows, fields] = await pool.execute(
        'SELECT * FROM `login`',
    );
    // console.log(rows)
    res.render('index.ejs', { title: 'Home page', user: [] })
}

let getSigninPage = (req, res) => {
    res.render('signin.ejs', {title: 'Sign in',layout: 'signin.ejs'})
}

let getSignupPage = (req, res) => {
    res.render('signup.ejs', {title: 'Sign up',layout: 'signup.ejs'})
}

let getAdminPage = (req, res) => {
    res.render('admin.ejs', {title: 'Admin page',layout: 'admin.ejs'})
}

let getNewsPage = (req, res) => {
    res.render('news.ejs')
}

module.exports = {
    getHomePage,
    getAboutPage,
    getSigninPage,
    getSignupPage,
    getAdminPage,
    getNewsPage
}