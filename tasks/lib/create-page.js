/**
 * grunt-svg-toolkit
 * https://github.com/iconic/grunt-svg-toolkit
 *
 * Copyright (c) 2015 Waybury, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (data, done) {
  data.phantomjs.createPage(function (newpage) {
    data.logger('New PhantomJS page created');

    data.page = newpage;

    newpage.set('onConsoleMessage', function (msg) {
      data.logger('Phantom Console: ' + msg);
    });

    newpage.set('onLoadStarted', function () {
      data.logger('Phantom page loading started');
    });

    newpage.set('onLoadFinished', function (status) {
      data.logger('Loading finished, the page is ' + ((status === 'success') ? 'open.' : 'not open!'));
    });

    // newpage.open('about:blank', function (status) {
    //   if (status === 'success') {
    //     data.logger('Phantom page opened');
    //     // data.logger(page.injectJs("injectme.js") ? "... done injecting itself!" : "... fail! Check the $PWD?!");
    //   }
    //   else {
    //     data.logger('Unable to open Phantom page: ' + status);
    //   }

    // });

    done(null, data);
  });

};
