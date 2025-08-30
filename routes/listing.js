const express = require('express');
const router = express.Router();
const Listing = require('../models/listing');
const { isLoggedIn } = require('../middleware');

const listingController = require('../controllers/listing');

// index route
router.get('/', listingController.renderIndex);

//add route
router.get('/add', isLoggedIn, listingController.renderCreateListing);

//create route
router.post('/', listingController.createListing);

//show route
router.get('/:id', listingController.showListing);

//edit route
router.get('/:id/edit', isLoggedIn, listingController.renderEditListing);

//update route
router.put('/:id', isLoggedIn, listingController.editListing);

//delete route
router.delete('/:id', isLoggedIn, listingController.deleteListing);

module.exports = router;
