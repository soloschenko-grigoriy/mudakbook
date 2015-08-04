'use strict';

var _ = require('underscore');

/**
 * @class REST controller
 *
 * @author Soloschenko G. soloschenko@gmail.com
 *
 */
var RESTController = function(model, shop, admin)
{
  this.model = model;
  this.shop  = shop;
  this.admin = admin;

  return this;
};

/**
 * @constructor
 */
RESTController.prototype.constructor = RESTController;

RESTController.prototype.isCrossDomain = function(req, res, next)
{

  return req.headers.origin && (req.headers.origin !== req.protocol + '://' + req.get('host'));
};

/**
 * Chech if user allowed
 *
 * @param  {Express.Request}  req
 * @param  {Express.Responce} res
 * @param  {Function}         next
 * @param  {Function}         callback
 *
 * @return {Controller}
 */
RESTController.prototype.checkAccess = function(req, res, next, callback)
{
  if(!req.headers['x-auth-token']){
    res.status(401).json('Not alowed');

    return this;
  }

  var self = this;
  this.shop.list({
    data   : {
      token: req.headers['x-auth-token']
    },
    success: function(result)
    {
      if(result.length < 1){
        self.admin.list({
          data   : {
            token: req.headers['x-auth-token']
          },
          success: function(result)
          {
            if(result.length < 1){
              return res.status(401).json('Not alowed');
            }else{
              self.allowCrossDomain(req, res, next);
              req.headers.origin = undefined;
              callback(req, res, next, true);
            }
          },
          error  : function(err)
          {
            return res.status(500).send(err);
          }
        });
      }else{
        self.allowCrossDomain(req, res, next);
        req.headers.origin = undefined;
        callback(req, res, next, true);
      }
    },
    error  : function(err)
    {
      return res.status(500).send(err);
    }
  });

  return this;
};

/**
 * Allow request to be send by cross domain
 *
 * @param  {Express.Request}  req
 * @param  {Express.Responce} res
 * @param  {Function}         next
 *
 * @return {Controller}
 */
RESTController.prototype.allowCrossDomain = function(req, res, next)
{
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,HEAD,POST,PUT,PATCH,UPDATE,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Length,Content-Type,X-Auth-Token');

  return this;
};

/**
 * Index page
 *
 * @param  {Express.Request}  req
 * @param  {Express.Responce} res
 * @param  {Function}         next
 *
 * @return {ShopAuth}
 */
RESTController.prototype.options = function(req, res, next)
{
  this.allowCrossDomain(req, res, next);

  res.json(true);

  return this;
};

/**
 * Load one item
 *
 * @param  {Express.Request}  req
 * @param  {Express.Responce} res
 * @param  {Function}         next
 *
 * @return {Controller}
 */
RESTController.prototype.count = function(req, res, next)
{
  if(this.isCrossDomain(req, res, next)){
    return this.checkAccess(req, res, next, _.bind(this.count, this));
  }

  this.model.count({
    data   : req.query,
    success: function(result)
    {
      return res.json(result);
    },
    error  : function(err)
    {
      return res.status(500).send(err);
    }
  });

  return this;
};

/**
 * Load one item
 *
 * @param  {Express.Request}  req
 * @param  {Express.Responce} res
 * @param  {Function}         next
 *
 * @return {Controller}
 */
RESTController.prototype.load = function(req, res, next)
{
  if(this.isCrossDomain(req, res, next)){
    return this.checkAccess(req, res, next, _.bind(this.load, this));
  }

  this.model.load({
    id     : req.params.id,
    data   : req.query,
    success: function(result)
    {
      return res.json(result);
    },
    error  : function(err)
    {
      return res.status(500).send(err);
    }
  });

  return this;
};

/**
 * Get list of items
 *
 * @param  {Express.Request}  req
 * @param  {Express.Responce} res
 * @param  {Function}         next
 *
 * @return {Controller}
 */
RESTController.prototype.list = function(req, res, next)
{
  if(this.isCrossDomain(req, res, next)){
    return this.checkAccess(req, res, next, _.bind(this.list, this));
  }

  this.model.list({
    data   : req.query,
    success: function(result)
    {
      return res.json(result);
    },
    error  : function(err)
    {
      return res.status(500).send(err);
    }
  });

  return this;
};

/**
 * Create one item
 *
 * @param  {Express.Request}  req
 * @param  {Express.Responce} res
 * @param  {Function}         next
 *
 * @return {Controller}
 */
RESTController.prototype.create = function(req, res, next)
{
  if(this.isCrossDomain(req, res, next)){
    return this.checkAccess(req, res, next, _.bind(this.create, this));
  }

  this.model.create({
    data   : req.body,
    cookies: req.cookies,
    headers: req.headers,
    success: function(result)
    {
      return res.json(result);
    },
    error  : function(err, status)
    {
      return res.status(status || 500).send(err);
    }
  });

  return this;
};

/**
 * Update one item
 *
 * @param  {Express.Request}  req
 * @param  {Express.Responce} res
 * @param  {Function}         next
 *
 * @return {Controller}
 */
RESTController.prototype.change = function(req, res, next)
{
  if(this.isCrossDomain(req, res, next)){
    return this.checkAccess(req, res, next, _.bind(this.change, this));
  }

  this.model.change({
    data      : req.body,
    criteria  : {_id: req.params.id},
    headers   : req.headers,
    additional: {},
    success   : function(result)
    {
      return res.json(result);
    },
    error     : function(err)
    {
      return res.status(500).send(err);
    }
  });

  return this;
};

/**
 * Delete one item
 *
 * @param  {Express.Request}  req
 * @param  {Express.Responce} res
 * @param  {Function}         next
 *
 * @return {Controller}
 */
RESTController.prototype.destroy = function(req, res, next)
{
  if(this.isCrossDomain(req, res, next)){
    return this.checkAccess(req, res, next, _.bind(this.destroy, this));
  }

  this.model.destroy({
    criteria: {_id: req.params.id},
    headers : req.headers,
    success : function(result)
    {
      return res.json(result);
    },
    error   : function(err)
    {
      return res.status(500).send(err);
    }
  });

  return this;
};

module.exports = RESTController;