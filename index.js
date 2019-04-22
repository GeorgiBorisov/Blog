const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const config = require('./config')
const session = require('express-session')
const mySQLStore = require('express-mysql-session')(session)

const app = express();

const sessionStore = new mySQLStore(config.sessionOptions)
const errorController = require('./controllers/error')
app.set('view engine', 'ejs')
app.set('views', 'views')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({
    secret: config.sessionSecret, store:sessionStore, resave: false, saveUninitialized: false
}))

const routes = require('./routes/router');

app.use(routes)

app.use(errorController.getError)

app.listen(3000)