const express = require('express');
const router = express.Router();
const Listing = require('../models/listing');
const { isLoggedIn } = require('../middleware');
// index route
router.get('/', async (req, res) => {
  const allListings = await Listing.find({});
  res.render('listings/home.ejs', { allListings });
});

//add route
router.get('/add', isLoggedIn, (req, res) => {
  res.render('listings/add.ejs');
});

//create route
router.post('/', async (req, res, next) => {
  try {
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash('success', 'New Listing Created!');
    res.redirect('/listings');
  } catch (err) {
    res.send(err);
  }
});

//show route
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: 'reviews', populate: { path: 'author' } })
    .populate('owner');
  if (!listing) {
    req.flash('error', 'Listing Not Found!');
    return res.redirect('/listings');
  }
  res.render('listings/show.ejs', { listing });
});

//edit route
router.get('/:id/edit', isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash('error', 'Listing Not Found!');
    return res.redirect('/listings');
  }
  res.render('listings/edit.ejs', { listing });
});

//update route
router.put('/:id', isLoggedIn, async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  req.flash('success', 'Listing Updated!');
  res.redirect(`/listings/${id}`);
});

//delete route
router.delete('/:id', isLoggedIn, async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash('success', 'Listing Deleted!');

  res.redirect('/listings');
});

module.exports = router;
