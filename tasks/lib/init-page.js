/**
 * grunt-svg-toolkit
 * https://github.com/iconic/grunt-svg-toolkit
 *
 * Copyright (c) 2015 Waybury, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (data, done) {

  // Create a simple page wrapper
  data.page.setContent('<html><head><title>SVG Toolkit Phantom Helper</title></head><body>Placeholder</body></html>');

  data.page.set('viewportSize', {
    width: 1024,
    height: 1024
  });

  data.page.evaluate(function () {
    // Clear the page
    document.querySelector('body').innerHTML = '';

    // Remove any margin/padding
    var bodyAndHtml = document.querySelectorAll('body, html');
    [].forEach.call(bodyAndHtml, function (item) {
      item.style.margin = '0';
      item.style.padding = '0';
      item.style.overflow = 'hidden';
    });

    return;

  }, function (result) {
    done(null, data);
  });
};
