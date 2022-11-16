import express from 'express'

let getHomePage = (req, res) => {
    res.render('index.ejs')
}

let getSigninPage = (req, res) => {
    res.render('signin.ejs')
}
let getSignupPage = (req, res) => {
    res.render('signup.ejs')
}

module.exports = {
    getHomePage,
    getSigninPage,
    getSignupPage,
}