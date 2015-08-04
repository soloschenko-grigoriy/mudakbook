var REST  = require('../../controllers/RESTController'),
    model = {},
    rest  = new REST(model);

describe('Test REST controller', function() {

  'use strict';

  it('-> should be defined', function(){
    expect(rest).toBeDefined();
  });

});