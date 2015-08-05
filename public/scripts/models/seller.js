/**
 * @class     Seller model
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
    constructor: function Seller()
    {

      return Backbone.RelationalModel.prototype.constructor.apply(this, arguments);
    },

    /**
     * Url for sync with server
     *
     * @type {String}
     */
    urlRoot: '/api/sellers'
  });
});