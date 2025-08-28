const express = require('express');
const router = express.Router({ mergeParams: true });
const Listing = require('../models/listing');
const Review = require('../models/review');

//Review Post
router.post('/', async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
      return res.status(404).send('Listing not found');
    }
    const newReview = new Review(req.body.review);
    await newReview.save();
    listing.reviews.push(newReview);
    await listing.save();
    req.flash('success', 'New Review Created!');
    res.redirect(`/listings/${listing._id}`);
  } catch (e) {
    res.status(500).send('Something went wrong');
  }
});

//Review Delete
router.delete('/:reviewId', async (req, res) => {
  try {
    const { id, reviewId } = req.params;
    await Review.findByIdAndDelete(reviewId);
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    req.flash('success', 'Review Deleted!');
    res.redirect(`/listings/${id}`);
  } catch (e) {
    res.status(500).send('Something went wrong');
  }
});

module.exports = router;
