const creatCrud = require('./generic.controller');
const { User } = require('../models');

module.exports = {
  ...creatCrud(User)
}