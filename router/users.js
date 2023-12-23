
const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controller/userController');

router.get('/profile', passport.checkAuthentication, userController.profile);

router.get('/signup', userController.signup);
router.get('/signin', userController.signin);


router.post('/create', userController.create);

// use passport as a middleware to authenticate
router.post('/createSession', passport.authenticate(
    'local',
    {failureRedirect: '/users/signin'},
), userController.createSession);

// router.get('/signout', userController.destroySession);
router.get('/signout', userController.signout);

router.get('/destroySession', userController.destroySession);

module.exports = router;