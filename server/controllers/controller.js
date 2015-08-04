'use strict';

var config  = require('../../config'),
    _       = require('underscore');

/**
 * @class Default controller
 *
 * @author Soloschenko G. soloschenko@gmail.com
 *
 */
var Controller = function()
{

  return this;
};

/**
 * @constructor
 */
Controller.prototype.constructor = Controller;

/**
 * Default route
 *
 * @param  {Express.Request}  req
 * @param  {Express.Responce} res
 * @param  {Function}         next
 *
 * @return {Controller}
 */
Controller.prototype.show = function(req, res, next)
{
  return this.render(req, res, next);
};

/**
 * Render page
 *
 * @param  {Express.Request}  req
 * @param  {Express.Responce} res
 * @param  {Function}         next
 *
 * @return {Controller}
 */
Controller.prototype.render = function(req, res, next)
{
  res.render(config.layout, { });

  return this;
};


module.exports = Controller;