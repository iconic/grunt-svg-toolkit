/**
 * grunt-svg-toolkit
 * https://github.com/iconic/grunt-svg-toolkit
 *
 * Copyright (c) 2015 Waybury, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (file, page, data, done) {

  page.setContent('<html><head><title>SVG Toolkit Phantom Helper</title></head><body>Placeholder</body></html>');

  // page.evaluate(function () {
  //   // document.write('<html><head><title>SVG Toolkit Phantom</title></head><body></body></html>');
  //   // document.write('<html><body><script>document.write("<h1>Hello From JS</h1>");</script><p>Hello from html</p></body></html>');
  //   return true;
  // }, function (result) {
  page.evaluate(function () {
    // var title = document.querySelector('title').innerText;
    // return document.querySelector('body').innerText;
    document.querySelector('body').innerHTML = '';
    return document.title;
  }, function (result) {
    console.log('Page title is: ' + result);
    done(null, file, page, data);
  });
  // });


};
