const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/user');

router.get('/signup', userController.renderSignUp);

router.post('/signup', userController.signUp);

router.get('/login', userController.renderLogin);

router.post(
  '/login',
  passport.authenticate('local', { failureRedirect: '/login', failureFlash: 'true' }),
  userController.login
);

router.get('/logout', userController.logout);

module.exports = router;
