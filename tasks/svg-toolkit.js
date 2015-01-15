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
  var phantomPage;

  grunt.registerMultiTask('svgtoolkit', 'Toolkit for working with SVG', function () {
    var allDone = this.async();

    var options = this.options({
      foo: 'blah'
    });

    var files = [];

    // Iterate over all specified file groups.
    this.files.forEach(function (f) {
      var cwd = path.resolve(f.orig.cwd || '.');

      var src = f.src.filter(function (filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        }
        else {
          return true;
        }
      }).forEach(function (file) {
        var filename = path.basename(file);
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

    // - Run each file object through async
    // - Async will pass each file object to a function which runs
    // the assembly line, waits for it to finish, and executes a callback
    // - When all callbacks have fired the grunt task will wrap up using the
    // done function
    async.eachSeries(
      files,
      function (file, fileDone) {
        // assemble(file.src, content, options, function (err, svg) {
        //   if (err) {
        //     return callback(err);
        //   }

        //   var outputPath = path.join(file.dest, path.basename(file.src));
        //   grunt.file.write(outputPath, svg);
        //   grunt.log.writeln('File "' + outputPath + '" created.');
        //   callback();
        // });

        async.waterfall([
          function loadSVG(taskDone) {
            console.log('Loading SVG file: ' + file.src);
            var data = {};
            data.svg = grunt.file.read(file.src);
            taskDone(null, file, phantomPage, data);
          },
          require('./lib/create-page'),
          require('./lib/reset-page'),
          require('./lib/process-svg'),
          require('./lib/process-png'),
          function saveSVG(file, page, data, taskDone) {
            var dest = path.join(file.destRoot, 'svg', file.destSubdir, file.filename);
            console.log('Writing SVG: ' + dest);
            grunt.file.write(dest, data.svg);
            taskDone(null, file, page, data);
          }
        ], function (err, file, page, data) {
          console.log('Done with file: ' + file.filename);

          // ::PERFORMANCE: Save page for re-use
          phantomPage = page;

          fileDone(err);
        });
      },
      function (err) {
        if (err) {
          console.error(err);
          return allDone(false);
        }

        console.log('Done with all SVGs');
        allDone();
      }
    );

  });
};
