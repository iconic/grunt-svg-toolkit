/**
 * grunt-svg-toolkit
 * https://github.com/iconic/grunt-svg-toolkit
 *
 * Copyright (c) 2015 Waybury, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (data, done) {
  var path = require('path');

  // Only make PNGs if requested
  if (!data.options.generatePNGs) {
    done(null, data);
    return;
  }

  data.page.evaluate(function () {
    var svgEl = document.querySelector('svg');

    return {
      svg: {
        width: svgEl.clientWidth,
        height: svgEl.clientHeight
      }
    };

  }, function (result) {
    // data.logger('Width x Height: ' + result.svg.width + 'x' + result.svg.height);

    // Update the page viewportSize and clipRect to match SVG dimensions
    data.page.set('viewportSize', {
      width: result.svg.width,
      height: result.svg.height
    });

    data.page.set('clipRect', {
      top: 0,
      left: 0,
      width: result.svg.width,
      height: result.svg.height
    });

    // Output filename
    var pngFilename = path.basename(data.file.filename, '.svg') + '.png';
    var dest = path.join(data.file.destRoot, 'png', data.file.destSubdir, pngFilename);

    // data.page.get('viewportSize', function (result) {
    //   data.logger('Current viewportSize size: ');
    //   data.logger(result);
    // });

    // Render to file
    data.page.render(dest, function () {
      data.logger('Generated PNG to file: ' + dest);
      done(null, data);
    });
  });

};
