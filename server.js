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
const cors = require('cors')
const path = require("path");
const fs = require('fs');


dotenv.config()
require('./Config/passport')

app.use(express.static(path.join(__dirname, "public")));
app.use(cors())
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


app.get('/auth/status', (req, res) => {
    res.json({ authenticated: req.isAuthenticated() });
});

app.get("/", (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect("/Home");
    } else {
        res.redirect("/About");
    }
});

const PublicDir = path.join(__dirname, 'public');
const StaticFiles = fs.readdirSync(PublicDir).filter(file => file.endsWith('.html'));

StaticFiles.forEach(file => {
    const cleanName = file.replace('.html', '');

    if (cleanName === 'Tasks') {
        return;
    }

    app.get(`/${cleanName}`, (req, res) => {
        res.sendFile(path.join(PublicDir, file));
    });
});

app.get('/Tasks', (req, res) => {
    console.log('Tasks route hit! Authenticated:', req.isAuthenticated());
    if (req.isAuthenticated()) {
        console.log('User is authenticated, serving Tasks.html');
        res.sendFile(path.join(PublicDir, 'Tasks.html'));
    } else {
        console.log('User not authenticated, redirecting to Signup.html');
        res.redirect('/Signup.html');
    }
});

const start = async () => {
    try {
        await ConnectDB(process.env.MONGO_URI)
        console.log('Connected to the Database');
    } catch (error) {
        console.log(error);

    }
}

start()

module.exports = app;