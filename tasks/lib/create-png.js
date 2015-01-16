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

  var pngFilename = path.basename(data.file.filename, '.svg') + '.png';
  var dest = path.join(data.file.destRoot, 'png', data.file.destSubdir, pngFilename);

  data.page.get('viewportSize', function (result) {
    console.log("Current viewportSize size: ");
    console.log(result);
  });

  data.page.render(dest, function () {
    console.log('Generated PNG to file: ' + dest);
    done(null, data);
  });

};
