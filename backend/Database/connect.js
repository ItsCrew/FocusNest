const mongoose = require('mongoose');

let cachedPromise = null;

const connectDB = async (url) => {
    if (!url) {
        throw new Error('MONGO_URI is not defined');
    }
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection;
    }
    if (!cachedPromise) {
        cachedPromise = mongoose.connect(url).catch((err) => {
            cachedPromise = null;
            throw err;
        });
    }
    return cachedPromise;
};

module.exports = connectDB;
