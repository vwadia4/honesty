const express = require('express');
const router = express.Router();
const passport = require('passport');

// Login Route
router.get('/login', (req, res) => {
    res.render('login');
});
router.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: 'Invalid email or password'
}), (req, res) => {
    req.session.user = req.user;
    const role = req.user.role;
    if (role === 'YoungFarmer') {
        res.redirect('/farmer-dashboard');
    } else if (role === 'SalesRep') {
        res.redirect('/sales-dashboard');
    } else if (role === 'manager-dasboard') {
        res.redirect('/broodmanager/dashboard');
    } else {
        req.flash('error', 'Invalid role');
        res.redirect('/login');
    }
});

// Logout Route
router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            console.error(err);
            req.flash('error', 'Error logging out');
            return res.redirect('/');
        }
        req.session.destroy((err) => {
            if (err) {
                console.error(err);
                req.flash('error', 'Error logging out');
                return res.redirect('/');
            }
            res.redirect('/login');
        });
    });
});

module.exports = router;