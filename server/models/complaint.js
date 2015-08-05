'use strict';

var mongoose = require('mongoose'),
    Model    = require('./_Model');

module.exports = new Model('complaint', {
  time         : Number,
  name         : String,
  card         : String,
  email        : String,
  phone        : String,
  website      : String,
  description  : String,
  user         : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  seller       : { type: mongoose.Schema.Types.ObjectId, ref: 'Seller' }
});