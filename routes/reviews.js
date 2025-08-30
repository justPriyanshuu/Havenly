const express = require('express');
const router = express.Router({ mergeParams: true });
const Listing = require('../models/listing');
const Review = require('../models/review');
const { isLoggedIn, isAuthor } = require('../middleware');

//Review Post
router.post('/', isLoggedIn, );

//Review Delete
router.delete('/:reviewId', isLoggedIn, isAuthor, async (req, res) => {
  try {
    const { id, reviewId } = req.params;
    await Review.findByIdAndDelete(reviewId);
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    req.flash('error', 'Review Deleted!');
    res.redirect(`/listings/${id}`);
  } catch (e) {
    res.status(500).send('Something went wrong');
  }
});

module.exports = router;
