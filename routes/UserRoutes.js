const express = require('express');
const router = express.Router();
const Userfun = require('../controllers/UserController')
const passport = require('passport');


function IfUserAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}
router.post('/users', Userfun.createUser);
router.get('/users', Userfun.listUsers);
router.get('/users/:id', Userfun.retrieveUser);
router.put('/users/:id', Userfun.updateUser);
router.delete('/users/:id', Userfun.deleteUser);
router.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',  // redirect to some dashboard or main page on success
    failureRedirect: '/login',     // redirect back to login on failure
    failureFlash: true             // use flash messages for failures (requires connect-flash middleware)
}));
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});
router.get('/protected-route', IfUserAuthenticated, (req, res) => {
    
    res.send('This is a protected route, accessible only to authenticated users.');
});
module.exports= router;