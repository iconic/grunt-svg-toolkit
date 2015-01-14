/**
 * grunt-svg-toolkit
 * https://github.com/iconic/grunt-svg-toolkit
 *
 * Copyright (c) 2015 Waybury, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
  var path = require('path');
  var fs = require('fs');
  var test = require('./lib/test');

  grunt.registerMultiTask('svgtoolkit', 'Toolkit for working with SVG', function () {
    var options = this.options({
      foo: 'blah'
    });

    var dest;
    this.files.forEach(function (files) {
      files.src.forEach(function (src) {
        dest = path.join(files.dest, src);
        console.log(src + ' -> ' + dest);
        grunt.file.copy(src, dest);
      });
    });


  });
};
