const {model, Schema, Schema: { Types: { ObjectId }}} = require('mongoose');

const Token = new Schema({
  token: {
    type: String,
    default: ''
  },
  user: {
    type: ObjectId,
    ref: 'User'
  }  
});

module.exports = model('Token', Token);
