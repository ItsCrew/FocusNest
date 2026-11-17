const passport = require('passport');
const Google = require('passport-google-oauth20');
const User = require('../Models/Users');

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id)
        done(null, user)
    } catch (error) {
        done(error, null)
    }
})

const getCallbackURL = () => {
  if (process.env.NODE_ENV === 'production' || process.env.VERCEL) {
    return process.env.PROD_CALLBACK_URL || process.env.CALLBACK_URL || 'https://focusnest.vercel.app/auth/google/callback';
  }
  if (process.env.NODE_ENV === 'preview') return process.env.PREV_CALLBACK_URL || process.env.CALLBACK_URL;
  return process.env.CALLBACK_URL || 'http://localhost:5000/auth/google/callback';
};

passport.use(new Google({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: getCallbackURL()


}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ googleId: profile.id })
        if (user) {
            return done(null, user)
        }

        user = await User.create({
            googleId: profile.id,
            displayName: profile.displayName,
            email: profile.emails[0].value,
            profilePicture: profile.photos[0]?.value
        })

        done(null, user)
    } catch (error) {
        done(error, null)
    }
}))

module.exports = passport;