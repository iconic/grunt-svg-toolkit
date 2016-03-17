/*jshint camelcase: false */
'use strict';

var grunt = require('grunt');
var fs = require('fs');

exports.svgtoolkit = {

  iconic_icons: function (test) {
    test.expect(7);

    var actual = 'tmp/svg/iconic/';
    var expected = 'test/expected/svg/iconic/';

    function checkSVGIcon(name) {
      test.equal(grunt.file.read(actual + name).trim(), grunt.file.read(expected + name).trim());
    }

    checkSVGIcon('flat/nexus-lg.svg');
    checkSVGIcon('flat/nexus-md.svg');
    checkSVGIcon('flat/nexus-sm.svg');

    checkSVGIcon('static/nexus-lg.svg');
    checkSVGIcon('static/nexus-md.svg');
    checkSVGIcon('static/nexus-sm.svg');

    checkSVGIcon('smart/nexus.svg');

    test.done();
  }

};
