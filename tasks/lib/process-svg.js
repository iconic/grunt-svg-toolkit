/**
 * grunt-svg-toolkit
 * https://github.com/iconic/grunt-svg-toolkit
 *
 * Copyright (c) 2015 Waybury, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (file, page, data, done) {

  var path = require('path');

  var dest = path.join(file.destRoot, 'svg', file.destSubdir, file.filename);
  // console.log(file.src + ' -> ' + dest);
  console.log('Processing SVG: ' + file.filename);
  // grunt.file.copy(file.src, dest);
  // console.log(data.svg);

  page.evaluate(function (data) {
    // var title = document.querySelector('title').innerText;
    // return document.querySelector('body').innerText;
    document.querySelector('body').innerHTML = data.svg;
    var svgViewbox = document.querySelector('svg').getAttribute('viewBox');
    return svgViewbox;
  }, function (result) {
    console.log('SVG Viewbox is: ' + result);
    done(null, file, page, data);
  }, data);
};
