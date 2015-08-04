/**
 * @class   Init
 *
 * @author  Soloschenko G. soloschenko@gmail.com
 *
 */
require.config({
  urlArgs: 'v=0.0.0',
  shim: {
    jquery: {
      exports: '$'
    },
    backbone: {
      deps: [
        'underscore',
        'jquery'
      ],
      exports: 'Backbone'
    },
    bootstrap: {
      deps: [
        'jquery'
      ]
    }
  },
  paths: {
    'jquery'           : 'vendor/jquery/dist/jquery.min',
    'backbone'         : 'vendor/backbone/backbone.min',
    'bootstrap'        : 'vendor/bootstrap/dist/js/bootstrap.min',
    'underscore'       : 'vendor/underscore/underscore.min',

    'backbone.marionette'   : 'vendor/backbone.marionette/lib/core/backbone.marionette.min',
    'backbone.wreqr'        : 'vendor/backbone.wreqr/lib/backbone.wreqr.min',
    'backbone.babysitter'   : 'vendor/backbone.babysitter/lib/backbone.babysitter.min',
    'backbone.relational'   : 'vendor/backbone-relational/backbone-relational.min',

    'text'              : 'vendor/requirejs-text/text.min',
    'tmpl'              : '../templates',
    'handlebars'        : 'vendor/require-handlebars-plugin/Handlebars',
    'i18nprecompile'    : 'vendor/require-handlebars-plugin/hbs/i18nprecompile.min',
    'json2'             : 'vendor/require-handlebars-plugin/hbs/json2.min',
    'hbs'               : 'vendor/require-handlebars-plugin/hbs.min',

    'communicator' : 'controllers/communicator',
    'dao'          : 'controllers/dao',
    'regionManager': 'controllers/regionManager',
    'router'       : 'controllers/router',
    'cookie'       : 'controllers/cookie'
  },

  hbs: {
    disableHelpers  : false,
    disableI18n     : true,
    helperDirectory : 'views/helper/'
  }
});
require(['infrastructure'], function(){
  'use strict';

  require(['app'], function(App){
      App.start();
  });
});