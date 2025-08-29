const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/signup', (req, res) => {
  res.render('users/signup.ejs');
});

router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);
    req.flash('success', 'Welcome to Havenly');
    res.redirect('/listings');
  } catch (e) {
    req.flash('error', 'Some error occured');
    res.redirect('/signup');
  }
});

router.get('/login', (req, res) => {
  res.render('users/login.ejs');
});

module.exports = router;
