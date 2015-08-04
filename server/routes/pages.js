'use strict';

var Controller = require('../controllers/controller'),
    controller = new Controller();

module.exports = function(app){

  app.get('/',  function(req, res, next){
    controller.show(req, res, next);
  });

};