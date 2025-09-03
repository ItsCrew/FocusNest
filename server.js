const express = require('express')
const app = express()
const dotenv = require('dotenv')
const connectDB = require('./Database/connect')
const cookieParser = require('cookie-parser');
const session = require('express-session')
const passport = require('passport')
const Auth = require('./routes/Auth')
const { isAuthenticatedForPages } = require('./Middleware/Auth')
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

// app.use('/api/v1/Tasks', Tasks)
app.use('/auth', Auth)

app.get('/', (req, res) => {
    res.redirect('/Home.html')
})

const port = process.env.PORT

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        console.log('Connected to the Database');

        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}...`);

        })
    } catch (error) {
        console.log(error);

    }
}

start()