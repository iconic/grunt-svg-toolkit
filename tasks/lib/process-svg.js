/**
 * grunt-svg-toolkit
 * https://github.com/iconic/grunt-svg-toolkit
 *
 * Copyright (c) 2015 Waybury, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (data, done) {
  console.log('Processing SVG: ' + data.file.filename);

  data.page.evaluate(function (svg) {
    // var title = document.querySelector('title').innerText;
    // return document.querySelector('body').innerText;

    // Put the SVG on the page
    // document.querySelector('body').innerHTML = svg;

    var parser = new DOMParser();
    var doc = parser.parseFromString(svg, 'image/svg+xml');
    // var importedDoc = document.importNode(doc.documentElement.firstChild, true);
    // var importedDoc = document.importNode(doc.documentElement, true);
    document.body.appendChild(doc.documentElement);


    function sanitizeSVG(element) {
      console.log('polygon: ' + element.getElementsByTagName('polygon').length);
      var item;
      item = element.getElementsByTagNameNS('*', 'pgf');
      console.log('pgf: ' + item.length);
      // if (item && item[0]) {
      //   item[0].parentNode.removeChild(item[0]);
      // }

      var items = element.getElementsByTagNameNS('*', 'pgf');
      [].forEach.call(items, function (item) {
        console.log('removing: ' + item);
        item.parentNode.removeChild(item);
      });

      item = element.getElementsByTagName('foreignObject');
      console.log('foreignObject: ' + element.getElementsByTagName('foreignObject').length);
      //console.log(item);
      if (item && item[0]) {
        item[0].parentNode.removeChild(item[0]);
      }

      item = element.getElementsByTagName('foreignobject');
      console.log('foreignobject: ' + element.getElementsByTagName('foreignobject').length);
      //console.log(item);
      if (item && item[0]) {
        item[0].parentNode.removeChild(item[0]);
      }
    }


    // Get the now live SVG DOM element to work with
    var svgEl = document.querySelector('svg');
    if (!svgEl) {
      console.log('Missing SVG Element!');
      console.log(document.querySelector('body').innerHTML);
    }

    sanitizeSVG(svgEl);

    // var s = new XMLSerializer();
    // console.log(s.serializeToString(svgEl));

    var result = {
      svg: {
        cleaned: document.querySelector('body').innerHTML,
        viewBox: svgEl.getAttribute('viewBox'),
        width: svgEl.clientWidth,
        height: svgEl.clientHeight,
      }
    };

    return result;

  }, function (result) {
    console.log('SVG Viewbox is: ' + result.svg.viewBox);
    console.log('Width x Height: ' + result.svg.width + 'x' + result.svg.height);

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

    data.svg = result.svg.cleaned;

    done(null, data);
  }, data.svg);
};
