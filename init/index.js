const mongoose = require('mongoose');
const initData = require('./data.js');
const Listing = require('../models/listing.js');

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Havenly');
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: '68b128a36e4fe5c7234b16ac',
  }));
  await Listing.insertMany(initData.data);
  console.log('DB initialized');
};

initDB();
