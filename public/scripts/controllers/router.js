/**
 * @class Application Router
 *
 * @author    Soloschenko G. soloschenko@gmail.com
 */
define([
  'backbone',
  'communicator',
  'dao',
  'views/layout/index',
  'views/layout/complain',
  'views/layout/search',
  'views/layout/e404'
], function(
    Backbone,
    Communicator,
    DAO,
    IndexLayout,
    ComplainLayout,
    SearchLayout,
    E404Layout
){

  'use strict';

  var Router = Backbone.Router.extend({

    /**
     * @type {Object} Routes list
     */
    routes: {
      ''          : 'index',
      'complain'  : 'complain',

      'search/:value' : 'search',

      '*notFound': 'e404'
    },

    /**
     * General preparations
     *
     * @return {Backbone.Router}
     */
    start: function()
    {
      Communicator.reqres.setHandler('ROUTER:navigate', this.localeNavigate, this);

      Backbone.history.start({ pushState: true });

      return this;
    },

    /**
     * Index route
     *
     * @return {Backbone.Router}
     */
    index: function()
    {
      this.setLocale();
      Communicator.reqres.request('RM:getRegion', 'container').show(new IndexLayout());
      Communicator.mediator.trigger('ROUTER:CHANGED', 'index');

      return this;
    },

    /**
     * Index route
     *
     * @return {Backbone.Router}
     */
    complain: function()
    {
      this.setLocale();
      Communicator.reqres.request('RM:getRegion', 'container').show(new ComplainLayout());
      Communicator.mediator.trigger('ROUTER:CHANGED', 'complain');

      return this;
    },

    /**
     * Index route
     *
     * @return {Backbone.Router}
     */
    search: function(value)
    {
      this.setLocale();
      Communicator.reqres.request('RM:getRegion', 'container').show(new SearchLayout({ value: value}));
      Communicator.mediator.trigger('ROUTER:CHANGED', 'search');

      return this;
    },

    /**
     * 404 route
     *
     * @return {Backbone.Router}
     */
    e404: function()
    {
      this.setLocale();
      Communicator.reqres.request('RM:getRegion', 'container').show(new E404Layout());
      Communicator.mediator.trigger('ROUTER:CHANGED', 'e404');

      return this;
    },

    /**
     * Change locale of app if first part of url is not empty or default
     *
     * @return {Backbone.Router}
     */
    setLocale: function()
    {
      if(_.first(Backbone.history.fragment.split('/')) === 'eng'){
        DAO.set('locale', 'en_en');
      }else{
        DAO.set('locale', 'ru_ru');
      }

      return this;
    },

    /**
     * Overrided backbone router navigate func
     * Because we have different locales - we shoudl navigate to neccessary one
     *
     * @param  {String} fragment
     * @param  {Object} options
     *
     * @return {Backbone.Router}
     */
    localeNavigate: function(fragment, options)
    {
      var localeFragment = fragment;
      if(DAO.get('locale') === 'en_en'){
        localeFragment = 'eng/' + fragment;
      }

      localeFragment = localeFragment.replace(/\/$/, ''); // remove trailing slash

      $('html, body').animate({scrollTop: 0}, 10);

      return this.navigate(localeFragment, options);
    }

  });

  return new Router();
});