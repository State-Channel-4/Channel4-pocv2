const faker = require('faker');
const ethers = require('ethers');
const mongoose = require('mongoose');
const { User, Tag, Url } = require('../models/schema');
require('dotenv').config()

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    // Populate data
    populateData()
      .then(() => {
        console.log('Data population completed');
        mongoose.disconnect();
      })
      .catch(err => {
        console.error('Data population error:', err);
        mongoose.disconnect();
      });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });



// Helper function to get random user id
async function getRandomUserId() {
    const users = await User.find({}, '_id'); // Fetch all user IDs from the database
    const randomIndex = Math.floor(Math.random() * users.length);
    const randomUserId = users[randomIndex]._id;
    return randomUserId;
}

// Helper function to generate a random array of tags
async function generateRandomTags() {
  const tagNames = ['gaming', 'retro', 'technology', 'sports', 'music'];

  const tags = [];
  const tagCount = faker.random.number({ min: 1, max: 3 });
  for (let i = 0; i < tagCount; i++) {
    const createdBy = await getRandomUserId();
    const tagName = faker.random.arrayElement(tagNames);
    const tag = new Tag({
      name: tagName,
      createdBy: createdBy,
      syncedToBlockchain: faker.random.boolean()
    });
    tags.push(tag);
  }
  return tags;
}

// Helper function to generate a random user
async function generateRandomUser() {
  const user = new User({
    walletAddress: ethers.Wallet.createRandom().address,
    likedUrls: [],
    submittedUrls: [],
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    syncedToBlockchain: faker.random.boolean()
  });
  await user.save();
  return user;
}

// Helper function to generate a random URL
async function generateRandomUrl() {
    const createdBy = await getRandomUserId();
    const url = new Url({
        title: faker.lorem.sentence(),
        url: faker.internet.url(),
        submittedBy: createdBy,
        likes: faker.random.number({ min: 0, max: 100 }),
        tags: await generateRandomTags(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
        syncedToBlockchain: faker.random.boolean()
    });
  return url;
}

// Main function to populate data
async function populateData() {
  try {
    // Create a random user
    const createdUser = await generateRandomUser();

    // Create random URLs
    const urlCount = 10; // Adjust the number of URLs to create
    const urls = [];
    for (let i = 0; i < urlCount; i++) {
      const url = await generateRandomUrl();
      url.submittedBy = createdUser._id;
      urls.push(url);
    }
    const createdUrls = await Url.insertMany(urls);

    // Assign URLs to user's submittedUrls array
    createdUser.submittedUrls = createdUrls.map(url => url._id);
    await createdUser.save();

    console.log('Data population completed successfully');
  } catch (error) {
    console.error('Data population error:', error);
  }
}
