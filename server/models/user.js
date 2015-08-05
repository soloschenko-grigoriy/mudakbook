'use strict';

var Model = require('./_Model');

module.exports = new Model('user', {
  name        : String,
  email       : String,
  phone       : String,
  token       : String,
  password    : String
});