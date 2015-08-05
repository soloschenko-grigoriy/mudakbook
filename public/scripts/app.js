/**
 * @class Application
 *
 * @author Soloschenko G. soloschenko@gmail.com
 *
 */
define([
  'backbone',
  'communicator',
  'regionManager',
  'router',
  'dao'
], function(
  Backbone,
  Communicator,
  RM,
  Router,
  DAO
){
  'use strict';

  var App = new Backbone.Marionette.Application();

  /* Add initializers here */
  App.addInitializer(function(){

    $.ajaxPrefilter(function( options, originalOptions, jqXHR ) {
      options.crossDomain = true;
      options.xhrFields = {
        withCredentials: true
      };
    });

    Communicator.reqres.request('RM:addRegion', 'container',  '#main-container');

    $('.doc-loader').fadeOut('slow');
    new WOW({
      animateClass: 'animated',
      mobile:       false,
      offset:       70
    }).init();

    $('body').on('click', 'a:not([data-bypass])', function(e){
      var href = $(this).prop('href'),
          root = location.protocol+'//'+location.host+'/';

      if($(this).hasClass('fancybox-thumb') || $(this).hasClass('not-open-page')){
        e.preventDefault();
        return this;
      }
      if($(this).data('changelang')){
        DAO.set('locale', $(this).data('changeLang'));
      }

      if(root===href.slice(0,root.length)){
        e.preventDefault();

        Communicator.reqres.request('ROUTER:navigate', href.slice(root.length), {trigger: true });
      }
    });

    Router.start();
  });

  return App;
});

