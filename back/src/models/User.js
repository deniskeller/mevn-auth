const {model, Schema} = require('mongoose');

const User = new Schema({
  name: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  },
  phone: {
    type: String,
    default: ''
  },
  language: {
    type: String,
    default: ''
  },
});

module.exports = model('User', User);
