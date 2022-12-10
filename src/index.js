import express from 'express'
import viewEngine from './config/viewEngine'
import webRoutes from './routes/web'
import session from 'express-session'
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}))



viewEngine(app)
webRoutes(app)

app.listen(PORT, () => {
    console.log('port: ' + PORT)
})