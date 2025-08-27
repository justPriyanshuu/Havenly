const express = require('express');
const router = express.Router();
const Listing = require('../models/listing');

// index route
router.get('/', async (req, res) => {
  const allListings = await Listing.find({});
  res.render('listings/home.ejs', { allListings });
});

//add route
router.get('/add', (req, res) => {
  res.render('listings/add.ejs');
});

//create route
router.post('/', async (req, res, next) => {
  try {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect('/listings');
  } catch (err) {
    res.send(err);
  }
});

//show route
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id).populate('reviews');
  res.render('listings/show.ejs', { listing });
});

//edit route
router.get('/:id/edit', async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  res.render('listings/edit.ejs', { listing });
});

//update route
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect(`/listings/${id}`);
});

//delete route
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);
  res.redirect('/listings');
});

module.exports = router;
