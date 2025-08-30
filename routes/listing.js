const express = require('express');
const router = express.Router();
const Listing = require('../models/listing');
const { isLoggedIn } = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudConfig');
const upload = multer({ storage });
const listingController = require('../controllers/listing');

router
  .route('/')
  .get(listingController.renderIndex)
  .post(upload.single('listing[image]'), (req, res) => {
    res.send(req.file);
  });
// .post(listingController.createListing);

router.get('/add', isLoggedIn, listingController.renderCreateListing);

router
  .route('/:id')
  .get(listingController.showListing)
  .put(isLoggedIn, listingController.editListing)
  .delete(isLoggedIn, listingController.deleteListing);

router.get('/:id/edit', isLoggedIn, listingController.renderEditListing);

module.exports = router;
