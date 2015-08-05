'use strict';

var Model = require('./_Model');

module.exports = new Model('seller', {
  name        : String,
  email       : String,
  phone       : String,
  token       : String,
  website     : String,
  password    : String,
  description : String
});