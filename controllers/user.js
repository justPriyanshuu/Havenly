const User = require('../models/user');

module.exports.renderSignUp = (req, res) => {
  res.render('users/signup.ejs');
};

module.exports.signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    await req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash('success', 'Welcome to Havenly!');
      res.redirect('/listings');
    });
  } catch (e) {
    req.flash('error', 'Some error occured');
    res.redirect('/signup');
  }
};

module.exports.renderLogin = (req, res) => {
  res.render('users/login.ejs');
};

module.exports.login = async (req, res) => {
  req.flash('Welcome back to Havenly!');
  res.redirect('/listings');
};

module.exports.logout = (req, res) => {
  req.logOut(() => {
    req.flash('success', 'You are logged out!');
    res.redirect('/listings');
  });
};
