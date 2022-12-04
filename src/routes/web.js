import express from 'express'
import homeControllers from '../controllers/homeControllers'

let route = express.Router()

const webRoutes = (app) => {
    route.get('/sign-in', homeControllers.getSigninPage)
    route.get('/sign-up', homeControllers.getSignupPage)
    route.get('/admin', homeControllers.getAdminPage)
    route.get('/news', homeControllers.getNewsPage)

    route.get('/', homeControllers.getHomePage)
    app.use('/', route)
}

module.exports = webRoutes