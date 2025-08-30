const Listing = require('../models/listing');

module.exports.renderIndex = async (req, res) => {
  const allListings = await Listing.find({});
  res.render('listings/home.ejs', { allListings });
};

module.exports.renderCreateListing = (req, res) => {
  res.render('listings/add.ejs');
};

module.exports.createListing = async (req, res, next) => {
  try {
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash('success', 'New Listing Created!');
    res.redirect('/listings');
  } catch (err) {
    res.send(err);
  }
};

module.exports.showListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: 'reviews', populate: { path: 'author' } })
    .populate('owner');
  if (!listing) {
    req.flash('error', 'Listing Not Found!');
    return res.redirect('/listings');
  }
  res.render('listings/show.ejs', { listing });
};

module.exports.renderEditListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash('error', 'Listing Not Found!');
    return res.redirect('/listings');
  }
  res.render('listings/edit.ejs', { listing });
};

module.exports.editListing = async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  req.flash('success', 'Listing Updated!');
  res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash('success', 'Listing Deleted!');

  res.redirect('/listings');
};
