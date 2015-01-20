/**
 * grunt-svg-toolkit
 * https://github.com/iconic/grunt-svg-toolkit
 *
 * Copyright (c) 2015 Waybury, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (data, done) {

  data.page.evaluate(function (svg) {
    // Import the SVG source string into the DOM
    var parser = new DOMParser();
    var doc = parser.parseFromString(svg, 'image/svg+xml');
    document.body.appendChild(doc.documentElement);

    return;

  }, function (result) {
    done(null, data);
  }, data.svg);
};
