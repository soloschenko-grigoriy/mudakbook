/**
 * @class Region Manager - for easy managin regions
 *
 * @author    Soloschenko G. soloschenko@gmail.com
 */
define(['backbone', 'communicator'], function(Backbone, Communicator){

  'use strict';

  var RegionManager = Backbone.Marionette.Controller.extend({

    initialize: function(){
      this._regionManager = new Backbone.Marionette.RegionManager();

      /* event API */
      Communicator.reqres.setHandler('RM:addRegion', this.addRegion, this);
      Communicator.reqres.setHandler('RM:removeRegion', this.removeRegion, this);
      Communicator.reqres.setHandler('RM:getRegion', this.getRegion, this);
    },

    /* add region facade   */
    addRegion: function( regionName, regionId ) {
      var region = this.getRegion( regionName );

      if( region ) {
        console.log('REGION ALREADY CREATED TO JUST RETURN RE!F');
        return region;
      }

      return this._regionManager.addRegion( regionName, regionId );
    },

    /* remove region facade */
    removeRegion: function( regionName ) {
      this._regionManager.removeRegion( regionName );
    },

    /* get region facade */
    getRegion: function( regionName ) {
      return this._regionManager.get( regionName );
    }
  });

  return new RegionManager();
});
