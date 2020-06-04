const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

// Creating Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
});

userSchema.methods.genarateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, config.get('jwtPrivateKey'));
  return token;
};
const User = mongoose.model('User', userSchema);

// Validating schema
function validateUser(user) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required(),
  };
  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;