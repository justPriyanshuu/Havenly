const express = require('express');
const router = express.Router({ mergeParams: true });

const { isLoggedIn, isAuthor } = require('../middleware');
const reviewController = require('../controllers/review')

//Review Post
router.post('/', isLoggedIn, reviewController.createReview);

//Review Delete
router.delete('/:reviewId', isLoggedIn, isAuthor, reviewController.destroyReview);

module.exports = router;
