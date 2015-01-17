/**
 * grunt-svg-toolkit
 * https://github.com/iconic/grunt-svg-toolkit
 *
 * Copyright (c) 2015 Waybury, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (data, done) {
  // console.log('Closing page');

  data.page.close();
  data.page = null;

  done(null, data);
};
