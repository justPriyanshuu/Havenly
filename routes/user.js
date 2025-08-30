const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/user');
const { saveRedirectUrl } = require('../middleware');

router.route('/signup').get(userController.renderSignUp).post(userController.signUp);

router
  .route('/login')
  .get(userController.renderLogin)
  .post(
    passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
    saveRedirectUrl,
    userController.login
  );

router.get('/logout', userController.logout);

module.exports = router;
