/**
 * @class     Complain page layout
 *
 * @author    Soloschenko G. soloschenko@gmail.com
 *
 */
define([
  'backbone',
  'views/layout/header',
  'hbs!tmpl/layout/complain'
], function(
  Backbone,
  Header,
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
    className: 'complain-container',

    /**
     * List of avaible regions
     *
     * @type {Object}
     */
    regions: {
       'header':'header'
    },

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
      this.header.show(new Header());

      return this;
    }
  });

});