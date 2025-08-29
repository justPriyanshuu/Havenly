const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    filename: String,
    url: {
      type: String,
      default: 'https://images.pexels.com/photos/3297593/pexels-photo-3297593.jpeg',
      set: (v) =>
        v === '' ? 'https://images.pexels.com/photos/3297593/pexels-photo-3297593.jpeg' : v,
    },
  },
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review',
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;
