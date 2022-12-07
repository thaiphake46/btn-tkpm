import appRootPath from "app-root-path";
import express from "express";
import expressLayouts from 'express-ejs-layouts'

const viewEngine = (app) => {
    app.set('view engine', 'ejs')
    app.set('views', appRootPath + '/src/views')
    app.use(expressLayouts)
    app.set('layout', appRootPath + '/src/views/layouts/full-width')
    app.use(express.static(appRootPath + '/src/public'))
}

module.exports = viewEngine