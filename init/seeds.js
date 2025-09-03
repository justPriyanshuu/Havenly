require('dotenv').config();
const mongoose = require('mongoose');
const Listing = require('../models/listing');
const { sampleListings } = require('./data');

const dbUrl = process.env.ATLASDB_URL;

async function main() {
  await mongoose.connect(dbUrl);
  console.log('✅ Connected to Atlas DB');
}

main()
  .then(async () => {
    await Listing.deleteMany({});
    await Listing.insertMany(sampleListings);
    console.log('🌱 Seeded database with listings!');
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error(err);
  });
