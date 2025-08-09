const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Listing = require('../Havenly/models/listing.js');
const path = require('path');

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Havenly');
}

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hi , i am root');
});

// index route
app.get('/listings', async (req, res) => {
  const allListings = await Listing.find({});
  res.render('listings/home.ejs', { allListings });
});

//add route
app.get('/listings/add', (req, res) => {
  res.render('listings/add.ejs');
});

//create route
app.post('/listings', async (req, res) => {
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect('/listings');
});

//show route
app.get('/listings/:id', async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  res.render('listings/show.ejs', { listing });
});

// app.get('/testlisting', async (req, res) => {
//   const samplelisting = new Listing({
//     title: 'new villa',
//     description: 'Near the beach',
//     price: 1500,
//     location: 'goa',
//     country: 'india',
//   });
//   await samplelisting.save();
//   res.send('testing complete');
// });

app.listen(8080, () => {
  console.log('server is listening to port 8080');
});
