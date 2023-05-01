const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  walletAddress: {
    type: String,
    required: true,
    unique: true
  },
  upvotedUrls: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'URL',
    unique: true
  }],
  downvotedUrls: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'URL',
    unique: true
  }],
  submittedUrls: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'URL',
    unique: true
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  syncedToBlockchain: {
    type: Boolean,
    default: false
  }
});

const User = mongoose.model('User', UserSchema)

const URLSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true,
    unique: true
  },
  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  upvotes: {
    type: Number,
    default: 0
  },
  downvotes: {
    type: Number,
    default: 0
  },
  tags: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tag'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  syncedToBlockchain: {
    type: Boolean,
    default: false
  }
});

const Url = mongoose.model('Url', URLSchema)

const TagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  urls: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'URL'
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  syncedToBlockchain: {
    type: Boolean,
    default: false
  }
});

const Tag = mongoose.model('Tag', TagSchema)

module.exports = {
  User: User,
  Tag: Tag,
  Url: Url
};