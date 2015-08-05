/**
 * @class     Header layout
 *
 * @author    Soloschenko G. soloschenko@gmail.com
 *
 */
define([
  'backbone',
  'hbs!tmpl/layout/header'
], function(
  Backbone,
  Tmpl
){

  'use strict';

  return Backbone.Marionette.LayoutView.extend({

    /**
     * Wrapper template
     *
     * @type {String}
     */
    template: Tmpl,

    /**
     * Class name of view container
     *
     * @type {String}
     */
    className: 'navbar navbar-default',

    /**
     * Tag name of view container
     *
     * @type {String}
     */
    tagName: 'nav',

    /**
     * List of avaible regions
     *
     * @type {Object}
     */
    regions: {},

    /**
     * DOM events on this view
     *
     * @type {Object}
     */
    events: {},

    /**
     * Render occurred
     *
     * @return {Backbone.Marionette.LayoutView}
     */
    onRender: function ()
    {
      this.$el.prop('role', 'navigation');

      return this;
    }
  });

});