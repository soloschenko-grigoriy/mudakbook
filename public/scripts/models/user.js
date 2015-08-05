/**
 * @class     User model
 *
 * @author    Soloschenko G. soloschenko@gmail.com
 *
 */
define(['backbone', 'dao'], function(Backbone, DAO){

  'use strict';

  return Backbone.RelationalModel.extend({

    /**
    * Simply override costructor for best debuging
    *
    * @chainable
    *
    * @return {Backbone.RelationalModel}
    */
    constructor: function User()
    {

      return Backbone.RelationalModel.prototype.constructor.apply(this, arguments);
    },

    /**
     * Url for sync with server
     *
     * @type {String}
     */
    urlRoot: '/api/users'
  });
});