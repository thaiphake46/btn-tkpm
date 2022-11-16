import express from 'express'
import viewEngine from './config/viewEngine'
import webRoutes from './routes/web'
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3000

viewEngine(app)
webRoutes(app)

app.listen(PORT, () => {
    console.log('port: ' + PORT)
})