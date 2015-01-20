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
  var async = require('async');
  var chalk = require('chalk');
  var phantomjs;
  var logger;

  grunt.registerMultiTask('svgtoolkit', 'Toolkit for working with SVG', function () {
    var allDone = this.async();

    // Defaults, merged and overridden with user settings
    var options = this.options({
      generatePNGs: true,
      debug: false
    });

    // Our custom logger that only logs when in debug mode
    logger = require('./lib/logger')(options.debug);

    // Iterate over all specified file groups and collect valid files
    var files = [];
    this.files.forEach(function (f) {
      var cwd = path.resolve(f.orig.cwd || '.');

      var src = f.src.filter(function (filepath) {
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        }
        else {
          return true;
        }
      }).forEach(function (file) {
        var filename = path.basename(file);

        // Extract the subdir so we can prefix it when saving the various types (svg, png, etc) to the dest
        var subdir = path.dirname(path.relative(cwd, path.resolve(file)));

        files.push({
          file: file,
          filename: filename,
          src: file,
          destRoot: f.orig.dest,
          destSubdir: subdir
        });
      });
    }, this);

    // Process each SVG
    async.eachSeries(
      files,
      function (file, fileDone) {
        async.waterfall([
          function init(done) {
            logger(chalk.yellow('Processing file: ' + file.filename));

            var data = {
              options: options,
              grunt: grunt,
              file: file,
              phantomjs: phantomjs,
              logger: logger
            };

            done(null, data);
          },
          require('./lib/init-phantomjs'),
          require('./lib/load-svg'),
          require('./lib/create-page'),
          require('./lib/init-page'),
          require('./lib/process-svg'),
          require('./lib/add-svg-to-page'),
          require('./lib/colorize-svg'),
          require('./lib/serialize-svg'),
          require('./lib/save-svg'),
          require('./lib/create-png'),
          require('./lib/close-page'),
        ], function (err, data) {

          logger('Done with file: ' + data.file.filename);
          logger(chalk.yellow('-------------------'));
          logger('');

          // ::PERFORMANCE: Save PhantomJS instance for re-use
          phantomjs = data.phantomjs;

          fileDone(err);
        });
      },
      function (err) {
        if (err) {
          console.error(err);
          return allDone(false);
        }

        console.log('');
        console.log(chalk.green.bold('Done processing all SVG files.'));
        allDone();
      }
    );

  });
};
