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

    phantom.create(function (ph) {
      // console.log('New PhantomJS instance created.');
      data.phantomjs = ph;
      done(null, data);
    }, {
      dnodeOpts: {
        weak: false
      }
    });
  }
  else {
    // console.log('Using previously created PhantomJS instance.');
    done(null, data);
  }
};
