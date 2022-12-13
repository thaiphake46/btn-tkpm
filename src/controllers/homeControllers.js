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
    let [rows] = await pool.execute(
        "SELECT * FROM news ORDER BY newsid DESC LIMIT 4"
    )
    let [sportsNews] = await pool.execute(
        "SELECT * FROM news WHERE topic = 'thể thao' ORDER BY newsid DESC LIMIT 5"
    )
    let [educationNews] = await pool.execute(
        "SELECT * FROM news WHERE topic = 'giáo dục' ORDER BY newsid DESC LIMIT 5"
    )
    let [techNews] = await pool.execute(
        "SELECT * FROM news WHERE topic = 'công nghệ' ORDER BY newsid DESC LIMIT 5"
    )
    let returnData = {
        title: 'Home page',
        user: currSession.name,
        dataNews: rows,
        sportsNews: sportsNews,
        educationNews: educationNews,
        techNews: techNews
    }
    if (currSession.loggedin) {
        res.render('index.ejs', returnData)
    }
    else {
        res.render('index.ejs', returnData)
    }
}

let getSigninPage = (req, res) => {
    res.render('signin.ejs', { title: 'Sign in', layout: 'signin.ejs' })
}

let getSignupPage = (req, res) => {
    res.render('signup.ejs', { title: 'Sign up', layout: 'signup.ejs' })
}

let getNewsPage = async (req, res) => {
    // console.log(req.params)
    let currSession = req.session
    let {newsid, title} = req.params
    let [rows] = await pool.execute(
        "SELECT * FROM news WHERE newsid = ?",
        [newsid]
    )
    // console.log(rows)
    res.render('news.ejs', {
        title: rows[0].title,
        user: currSession.name,
        data: rows[0]
    })
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
        if (rows[0]) {
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

let getAdminPage = (req, res) => {
    res.render('admin/admin.ejs', {
        title: 'Admin page',
        layout: 'admin/adminLayout.ejs'
    })
}

let getWriteNewsPage = (req, res) => {
    res.render('admin/writeNews.ejs', {
        title: 'Admin page',
        layout: 'admin/adminLayout.ejs'
    })
}

let getManagerNews = async (req, res) => {
    let [rows] = await pool.execute(
        'SELECT * FROM `news` ORDER BY newsid DESC'
    )
    // console.log(rows)
    res.render('admin/managerNews.ejs', {
        title: 'Manager news page',
        layout: 'admin/adminLayout.ejs',
        data: rows
    })
}


let uploadNews = async (req, res) => {
    let { title, img, topic, description, editor } = req.body
    await pool.execute(
        "INSERT INTO `news` (`newsid`, `title`, `topic`, `image_title`, `description`, `content`) VALUES (NULL, ?, ?, ?, ?, ?)",
        [title, topic, img, description, editor]
    )
    res.redirect('/admin/manager-news')
}

let deleteNews = async (req, res) => {
    let { newsid } = req.body
    await pool.execute(
        "DELETE FROM `news` WHERE `news`.`newsid` = ?",
        [newsid]
    )
    res.redirect('/admin/manager-news')
}

let editNewsPage = async (req, res) => {
    let newsid = req.params.newsid
    let [rows] = await pool.execute(
        "SELECT * FROM `news` WHERE newsid = ?",
        [newsid]
    )
    res.render('admin/handleEditNews.ejs', {
        title: 'Edit news page',
        layout: 'admin/adminLayout.ejs',
        data: rows[0]
    })
}

let handleEditNews = async (req, res) => {
    let { newsid, title, topic, img, description, editor } = req.body
    await pool.execute(
        "UPDATE `news` SET `title` = ?, `topic` = ?, `image_title` = ?, `description` = ?, `content` = ? WHERE `news`.`newsid` = ?",
        [title, topic, img, description, editor, newsid]
    )
    res.redirect('/admin/manager-news')
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
    getWriteNewsPage,
    uploadNews,
    getManagerNews,
    deleteNews,
    editNewsPage,
    handleEditNews,
}