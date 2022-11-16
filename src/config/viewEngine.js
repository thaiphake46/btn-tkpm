import appRootPath from "app-root-path";
import express from "express";


const viewEngine = (app) => {
    app.set('view engine', 'ejs')
    app.set('views', appRootPath + '/src/views')
    app.use(express.static(appRootPath + '/src/public'))
}

module.exports = viewEngine