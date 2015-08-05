'use strict';

var Controller = require('../controllers/controller'),
    controller = new Controller();

module.exports = function(app){

  app.get('/',  function(req, res, next){
    controller.show(req, res, next);
  });

  app.get('/complain',  function(req, res, next){
    controller.show(req, res, next);
  });

  app.get('/search/:value',  function(req, res, next){
    controller.show(req, res, next);
  });

};