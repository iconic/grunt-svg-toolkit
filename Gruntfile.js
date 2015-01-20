/**
 * grunt-svg-toolkit
 * https://github.com/iconic/grunt-svg-toolkit
 *
 * Copyright (c) 2015 Waybury, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      tests: 'tmp'
    },

    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      },
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

    // Configuration to be run (and then tested).
    svgtoolkit: {
      test: {
        options: {
          generatePNGs: true,
          // colorize: 'thistle',
          // style: 'test/fixtures/css/themes/blue.css',
          debug: true
        },
        files: [
          {
            expand: true,
            cwd: 'test/fixtures/',
            src: '**/*.svg',
            dest: 'tmp'
          }
        ]
      }
    }

  });

  // Load this plugin's task(s)
  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Test
  grunt.registerTask('test', ['jshint', 'clean', 'svgtoolkit', 'nodeunit']);

  // Default task
  grunt.registerTask('default', ['svgtoolkit']);
  // grunt.registerTask('default', ['test']);
};
