/**
 * grunt-svg-toolkit
 * https://github.com/iconic/grunt-svg-toolkit
 *
 * Copyright (c) 2015 Waybury, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (debug) {
  var logger = function(msg) {
    if (debug) {
      console.log('Debug: ' + msg);
    }
  };

  return logger;
};
