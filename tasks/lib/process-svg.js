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

    // If not defined, set the width and height attributes to match the viewBox dimensions
    function normalizeDimensions(element) {
      // Default to 256x256 if there is no viewBox
      // :TODO: Make this a config setting
      var viewbox = element.getAttribute('viewBox') || '0 0 256 256';
      viewbox = viewbox.split(' ');

      var dimensions = {
        x: viewbox[0],
        y: viewbox[1],
        width: viewbox[2],
        height: viewbox[3]
      };

      element.setAttribute('width', element.getAttribute('width') || dimensions.width);
      element.setAttribute('height', element.getAttribute('height') || dimensions.height);
    }

    function sanitizeSVG(element) {

      // Remove deprecated 'enable-background' attribute
      // http://www.w3.org/TR/filter-effects/#AccessBackgroundImage
      element.removeAttribute('enable-background');

      // Remove Adobe Illustrator image metadata
      var adobeMetadata = element.getElementsByTagNameNS('*', 'pgf');
      [].forEach.call(adobeMetadata, function (item) {
        console.log('Removing adobeMetadata');
        item.parentNode.removeChild(item);
      });

      // :NOTE: These selectors don't work because the requiredExtensions attribute
      // in the switch causes these elements to no render/exist evidently?
      var foreignObjects  = element.querySelectorAll('foreignObject, foreignobject');
      [].forEach.call(foreignObjects, function (item) {
        console.log('Removing foreignObject');
        item.parentNode.removeChild(item);
      });
    }

    // Import the SVG source string into the DOM
    var parser = new DOMParser();
    var doc = parser.parseFromString(svg, 'image/svg+xml');
    // var importedDoc = document.importNode(doc.documentElement.firstChild, true);
    // var importedDoc = document.importNode(doc.documentElement, true);
    document.body.appendChild(doc.documentElement);

    // Get the now live SVG DOM element to work with
    var svgEl = document.querySelector('svg');
    if (!svgEl) {
      console.log('Missing SVG Element!');
      console.log(document.querySelector('body').innerHTML);
    }

    // Now that we have the SVG in Phantom as a DOM element, process it...
    sanitizeSVG(svgEl);
    normalizeDimensions(svgEl);

    // Serialize the SVG DOM element back into a string and return it
    var serializer = new XMLSerializer();
    var result = {
      svg: {
        cleaned: serializer.serializeToString(svgEl)
      }
    };

    return result;

  }, function (result) {

    // Update and pass along the newly transformed SVG
    data.svg = result.svg.cleaned;

    done(null, data);
  }, data.svg);
};
