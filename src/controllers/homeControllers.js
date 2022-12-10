import express from 'express'
import pool from '../config/connectDB'
import session from 'express-session'

let getAboutPage = (req, res) => {
    res.render('about.ejs', {
        title: 'About Page',
        layout: 'layouts/sidebar.ejs'
    })
}

let getHomePage = async (req, res) => {
    let currSession = req.session
    if (currSession.loggedin) {
        res.render('index.ejs', { title: 'Home page', user: currSession.name })
    }
    else {
        res.render('index.ejs', { title: 'Home page', user: '' })
    }
}

let getSigninPage = (req, res) => {
    res.render('signin.ejs', { title: 'Sign in', layout: 'signin.ejs' })
}

let getSignupPage = (req, res) => {
    res.render('signup.ejs', { title: 'Sign up', layout: 'signup.ejs' })
}

let getAdminPage = (req, res) => {
    res.render('admin.ejs', { title: 'Admin page', layout: 'admin.ejs' })
}

let getNewsPage = (req, res) => {
    res.render('news.ejs')
}

let authLogIn = async (req, res) => {
    let { email, password } = req.body
    if (email && password) {
        let [user] = await pool.execute(
            'SELECT * FROM login WHERE email = ? AND password = ?',
            [email, password]
        )
        if (user[0]) {
            req.session.loggedin = true
            req.session.uid = user[0].id
            req.session.name = user[0].name
            req.session.email = email
            res.redirect('/')
        }
        else {
            res.send('Incorrect Username and/or Password!')
        }
    }
}

let logOut = (req, res) => {
    req.session.loggedin = false
    req.session.uid = undefined
    req.session.name = undefined
    req.session.email = undefined
    res.redirect('/')
}

let authSignup = async (req, res) => {
    let { user, email, password, password_confirm } = req.body
    // console.log(user, email, password, password_confirm )
    if (user && email && password && password_confirm) {
        if (password != password_confirm) {
            res.send('Mật khẩu không chính xác')
        }
        let [rows] = await pool.execute(
            'SELECT * FROM login WHERE email = ?',
            [email]
        )
        if(rows[0]) {
            res.send('Tài khoản đã tồn tại')
        }
        else {
            await pool.execute(
                'INSERT INTO `login` (`id`, `name`, `email`, `password`) VALUES (NULL, ?, ?, ?)',
                [user, email, password]
            )
            res.redirect('/sign-in')
        }
    }
}

module.exports = {
    getHomePage,
    getAboutPage,
    getSigninPage,
    getSignupPage,
    getAdminPage,
    getNewsPage,
    authLogIn,
    logOut,
    authSignup,
}