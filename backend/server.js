const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
const ConnectDB = require('./Database/connect');
const Auth = require('./routes/Auth');
const Tasks = require('./routes/Tasks');
const MongoStore = require('connect-mongo');
const cors = require('cors');

dotenv.config({ path: path.join(__dirname, '.env') });
require('./Config/passport');
const port = Number(process.env.PORT || 5000);

// Trust proxy for Vercel and reverse proxies (ensures secure cookies over HTTPS)
app.set('trust proxy', 1);

// Middleware to restore req.url when rewritten by Vercel serverless proxy
app.use((req, res, next) => {
    if (req.headers['x-matched-path']) {
        req.url = req.headers['x-matched-path'];
    }
    next();
});

app.use(cors({
    origin: true,
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Ensure MongoDB is connected before processing requests
app.use(async (req, res, next) => {
    try {
        if (process.env.MONGO_URI) {
            await ConnectDB(process.env.MONGO_URI);
        }
        next();
    } catch (error) {
        console.error('Database connection error:', error);
        res.status(500).json({ error: 'Database connection failed' });
    }
});

app.use(session({
    secret: process.env.SESSION_SECRET || 'focusnest_session_secret_fallback',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        collectionName: 'sessions',
        touchAfter: 24 * 3600
    }),
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/v1/Tasks', Tasks);
app.use('/auth', Auth);

// Only listen directly when running standalone / local dev (e.g. node server.js)
if (require.main === module) {
    if (process.env.MONGO_URI) {
        ConnectDB(process.env.MONGO_URI)
            .then(() => console.log('Connected to the Database'))
            .catch(console.error);
    }
    app.listen(port, () => {
        console.log(`Focusnest API listening on http://localhost:${port}`);
    });
}

module.exports = app;
