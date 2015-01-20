/**
 * grunt-svg-toolkit
 * https://github.com/iconic/grunt-svg-toolkit
 *
 * Copyright (c) 2015 Waybury, contributors
 * Licensed under the MIT license.
 */

'use strict';

// :TODO: Use Cheerio for SVG DOM manip/parse/serialize, and to avoid
// the Phantom XMLSerializer namespace attribute mangling issue

module.exports = function (data, done) {
  data.logger('Serializing SVG');

  data.page.evaluate(function () {

    var svgEl = document.querySelector('svg');

    // Serialize the SVG DOM element back into a string and return it
    //
    // :BUG: PhantomJS drops the prefix from namespaced attributes during serialization
    // Reference: https://github.com/ariya/phantomjs/issues/10962
    var serializer = new XMLSerializer();
    var result = {
      svg: {
        cleaned: serializer.serializeToString(svgEl)
      }
    };

    return result;

  }, function (result) {

    // Update and pass along the newly transformed SVG
    data.svg = result.svg.cleaned;

    done(null, data);
  });
};
