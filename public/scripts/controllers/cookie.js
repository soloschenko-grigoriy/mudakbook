/**
 * @class Cookie manager
 *
 * @author Soloschenko G. soloschenko@gmail.com
 *
 */
define(['backbone', 'communicator'], function(Backbone, Communicator){

  'use strict';

  var Cookie = Backbone.Marionette.Controller.extend({

    /**
     * Get cookie by name
     *
     * @param  {String} name
     *
     * @return {String|null} - A value of found cookie or null if not found
     */
    get: function(name)
    {
      var matches = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'));

      return matches ? decodeURIComponent(matches[1]) : undefined;
    },

    /**
     * Adding a cookie
     *
     * @chainable
     *
     * @param {String} name     - A name for cookie
     * @param {String} value    - A value for cookie
     * @param {Object} options  - A hash of params for cookie (expires (Number, Date), path (String), domain (String), secure(Boolean)
     *
     * @return {Cookie}
     */
    set: function(name, value, options)
    {
      options = options || {};

      var expires = options.expires;
      if(typeof expires == 'number' && expires) {
        var d = new Date();
        d.setTime(d.getTime() + expires*1000);
        expires = options.expires = d;
      }

      if(expires && expires.toUTCString) {
        options.expires = expires.toUTCString();
      }

      value = encodeURIComponent(value);

      var updatedCookie = name + '=' + value;
      for(var propName in options) {
        updatedCookie += '; ' + propName;
        var propValue = options[propName];
        if(propValue !== true) {
          updatedCookie += '=' + propValue;
        }
      }

      document.cookie = updatedCookie;

      return this;
    },

    /**
     * Delete cookie by name
     *
     * @chainable
     *
     * @param  {String} name
     *
     * @return {Cookie}
     */
    remove: function(name)
    {
      this.set(name, '', { expires: -1 });

      return this;
    }

  });

  return new Cookie();
});