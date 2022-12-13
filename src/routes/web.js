import express from 'express'
import homeControllers from '../controllers/homeControllers'
import session from 'express-session'
import pool from '../config/connectDB'

let route = express.Router()

const webRoutes = (app) => {


    route.get('/sign-in', homeControllers.getSigninPage)
    route.get('/sign-up', homeControllers.getSignupPage)

    route.get('/admin', homeControllers.getAdminPage)
    route.get('/admin/write-news', homeControllers.getWriteNewsPage)
    route.get('/admin/manager-news', homeControllers.getManagerNews)
    route.post('/admin/write-news/upload', homeControllers.uploadNews)
    route.post('/admin/write-news/delete', homeControllers.deleteNews)
    route.get('/admin/write-news/edit/:newsid', homeControllers.editNewsPage)
    route.post('/admin/write-news/edit-news', homeControllers.handleEditNews)
    
    app.post('/login', homeControllers.authLogIn)
    app.post('/signup', homeControllers.authSignup)
    app.get('/logout', homeControllers.logOut)

    route.get('/', homeControllers.getHomePage)
    route.get('/news/:newsid/:title', homeControllers.getNewsPage)

    route.get('/about', homeControllers.getAboutPage)
    app.use('/', route)
}

module.exports = webRoutes