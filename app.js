const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const engine = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');

const listing = require('./routes/listing.js');
const review = require('./routes/reviews.js');

const sessionOptions = {
  secret: 'mysecretCode',
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.engine('ejs', engine);
app.use(express.static(path.join(__dirname, 'public')));

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Havenly');
}

app.get('/', (req, res) => {
  res.send('Hi , i am root');
});

app.use(session(sessionOptions));
app.use(flash());

app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  next();
});

app.use('/listings', listing);
app.use('/listings/:id/reviews', review);

app.use((err, req, res, next) => {
  res.send('Something Went Wrong!');
});

app.listen(8080, () => {
  console.log('server is listening to port 8080');
});
