const mongoose = require('mongoose');

/** Schema for defining user attributes and roles in the database. */

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['Admin', 'Seller', 'Shopper'],
    default: 'Shopper',
  },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
