import express from 'express'
import homeControllers from '../controllers/homeControllers'
import session from 'express-session'
import pool from '../config/connectDB'

let route = express.Router()

const webRoutes = (app) => {


    route.get('/sign-in', homeControllers.getSigninPage)
    route.get('/sign-up', homeControllers.getSignupPage)
    route.get('/admin', homeControllers.getAdminPage)
    route.get('/news', homeControllers.getNewsPage)

    app.post('/login', homeControllers.authLogIn)
    app.post('/signup', homeControllers.authSignup)
    app.get('/logout', homeControllers.logOut)

    route.get('/', homeControllers.getHomePage)
    route.get('/about', homeControllers.getAboutPage)
    app.use('/', route)
}

module.exports = webRoutes