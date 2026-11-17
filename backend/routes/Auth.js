const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL;
        const clientUrl = isProduction ? '' : 'http://localhost:5173';
        res.redirect(`${clientUrl}/tasks`);
    }
)

router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ message: 'Error during logout' });
        }
        const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL;
        const clientUrl = isProduction ? '' : 'http://localhost:5173';
        res.redirect(`${clientUrl}/home`);
    });
});

router.get('/status', (req, res) => {
    if (req.isAuthenticated()) {
        res.json({
            authenticated: true,
            user: {
                id: req.user._id,
                displayName: req.user.displayName,
                email: req.user.email,
                profilePicture: req.user.profilePicture
            }
        });
    } else {
        res.json({ authenticated: false });
    }
});
module.exports = router;