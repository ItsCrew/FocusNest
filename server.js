const express = require('express')
const session = require('express-session')
const passport = require('passport')
const cookieParser = require('cookie-parser');
const app = express()
const dotenv = require('dotenv')
const ConnectDB = require('./Database/connect')
const Auth = require('./routes/Auth')
const { isAuthenticatedForPages } = require('./Middleware/Auth')
const Tasks = require('./routes/Tasks')
const MongoStore = require('connect-mongo')


dotenv.config()
require('./Config/passport')

app.use(express.static('./public'))
app.use(express.json())
app.use(cookieParser())

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        collectionName: 'sessions'
    }),
    cookie: {
        secure: false,
        maxAge: 24 * 60 * 60 * 1000
    }
}))


app.use(passport.initialize())
app.use(passport.session())

app.use('/api/v1/Tasks', Tasks)
app.use('/auth', Auth)

app.get("/", (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect("/Home.html");
    } else {
        res.redirect("/About.html");
    }
});


const port = process.env.PORT

const start = async () => {
    try {
        await ConnectDB(process.env.MONGO_URI)
        console.log('Connected to the Database');

        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}...`);

        })
    } catch (error) {
        console.log(error);

    }
}

start()