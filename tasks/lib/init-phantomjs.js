/**
 * grunt-svg-toolkit
 * https://github.com/iconic/grunt-svg-toolkit
 *
 * Copyright (c) 2015 Waybury, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (data, done) {

  if (!data.phantomjs) {
    var phantom = require('phantom');

    phantom.create(['--web-security=no']).then(function(ph) {
      data.logger('New PhantomJS instance created.');

      data.phantomjs = ph;

      done(null, data);
    });

    // phantom.create(function (ph) {
    //
    // }, {
    //   dnodeOpts: {
    //     weak: false
    //   }
    // });
  }
  else {
    data.logger('Using previously created PhantomJS instance.');

    done(null, data);
  }
};
