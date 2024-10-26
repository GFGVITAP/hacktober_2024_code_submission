const express = require("express")
const app = express()
const path = require('path')
const ejsMate = require('ejs-mate')
const controller = require('./controllers/appController.js')
const session = require('express-session')
const isAuth = require('./middleware/isAuth.js')


const DataBase = require('./connect/db.js')
const device = require('express-device');
const MongoDBStore = require("connect-mongodb-session")(session);
require('dotenv').config();

const uri = process.env.uri
const key = process.env.key

DataBase.connect(uri)

const store = new MongoDBStore({
    uri: uri,
    collection: "userSession",
});


module.exports = store;

app.use(session({
    secret: key,
    resave: false,
    saveUninitialized: false,
    store: store
}));



app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))
app.engine("ejs", ejsMate);
app.use(device.capture());


app.get('/',controller.index)

app.get('/signIn',controller.signIn)

app.get('/signUp',controller.signUp)

app.post('/create',controller.create)

app.get('/verify/:id', controller.emailVerify)

app.post('/authenticate',controller.authenticate)

app.get('/home',isAuth,controller.home)

app.get('/profile',isAuth,controller.profile)

app.get('/edit',isAuth,controller.edit)

app.get('/signOut',isAuth,controller.signOut)

app.post('/search',isAuth,controller.report)

app.listen(3000)