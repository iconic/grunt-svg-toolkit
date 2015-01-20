/**
 * grunt-svg-toolkit
 * https://github.com/iconic/grunt-svg-toolkit
 *
 * Copyright (c) 2015 Waybury, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (data, done) {
  data.logger('Loading SVG file: ' + data.file.src);

  data.svg = data.grunt.file.read(data.file.src);

  done(null, data);
};
