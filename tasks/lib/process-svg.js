/**
 * grunt-svg-toolkit
 * https://github.com/iconic/grunt-svg-toolkit
 *
 * Copyright (c) 2015 Waybury, contributors
 * Licensed under the MIT license.
 */

'use strict';

var async = require('async');
var cheerio = require('cheerio');

module.exports = function (data, done) {
  data.logger('Processing SVG');

  // Parse the SVG into a cheerio object
  function ingestSVG(cb) {
    // :NOTE: xmlMode is important to not lowercase SVG tags
    // and attributes, like viewBox and clipPath
    var $ = cheerio.load(data.svg, {
      xmlMode: true
    });

    cb(null, $, data);
  }

  async.waterfall([
    ingestSVG,
    require('./svg/sanitize'),
    require('./svg/remove-comments'),
    require('./svg/add-dimensions-from-viewbox'),
    require('./svg/ids-to-classes'),
  ], function (err, $) {
    // Save the now processed SVG content, removing any blank lines
    data.svg = $.xml().replace(/^\s*[\r\n]/gm, '');

    done(null, data);
  });

};
