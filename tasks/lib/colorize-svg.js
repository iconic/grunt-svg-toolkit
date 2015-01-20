/**
 * grunt-svg-toolkit
 * https://github.com/iconic/grunt-svg-toolkit
 *
 * Copyright (c) 2015 Waybury, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (data, done) {
  data.logger('Colorizing SVG');

  if (!data.options.colorize && !data.options.style) {
    done(null, data);
    return;
  }

  var stylesheet;
  if (data.options.style) {
    if (!data.grunt.file.exists(data.options.style)) {
      data.grunt.log.warn('Style file "' + data.options.style + '" defined but not found.');
    }
    else {
      stylesheet = data.grunt.file.read(data.options.style);
    }
  }

  data.page.evaluate(function (options, stylesheet) {

    // Inject the stylesheet, if defined
    var style;
    if (stylesheet) {
      style = document.createElement('style');
      style.appendChild(document.createTextNode(stylesheet));
      document.head.appendChild(style);
    }

    // Given an element, color it by inlining a fill or stroke attribute.
    // If color isn't define, it will use the current computed style for
    // use when applying styles via CSS
    function svgcolor(el, color) {
      var styles = window.getComputedStyle(el, null);

      var fill = styles['fill'];
      var stroke = styles['stroke'];

      var isFill, isStroke;
      if (!fill && !stroke) {
        isFill = true;
      }
      else {
        if (fill && fill !== 'none') {
          isFill = true;
        }

        if (stroke && stroke !== 'none') {
          isStroke = true;
        }
      }

      if (isStroke) {
        el.style.stroke = null;
        el.setAttribute('stroke', color || stroke);
      }

      if (isFill) {
        el.style.fill = null;
        el.setAttribute('fill', color || fill);
      }
    }

    // The SVG element
    var svgEl = document.querySelector('svg');

    // Fill and Stroke styles only apply to shapes and text content elements, per the SVG spec:
    // http://www.w3.org/TR/SVG/painting.html#FillProperty
    // http://www.w3.org/TR/SVG/painting.html#StrokeProperty
    //
    // Shapes: http://www.w3.org/TR/SVG/intro.html#TermShape
    // ‘path’, ‘rect’, ‘circle’, ‘ellipse’, ‘line’, ‘polyline’ and ‘polygon’
    //
    // Text: http://www.w3.org/TR/SVG/intro.html#TermTextContentElement
    // ‘altGlyph’, ‘textPath’, ‘text’, ‘tref’ and ‘tspan’
    var shapesAndText = 'path,rect,circle,ellipse,line,polyline,polygon,altGlyph,textPath,text,tref,tspan';
    var els = svgEl.querySelectorAll(shapesAndText);

    [].forEach.call(els, function (item) {
      svgcolor(item, options.colorize);
    });

    // Remove the stylesheet now since there could be specific rules
    // in the CSS that change once we've added/updated the fill and
    // stroke attributes.
    //
    // Example: svg path[fill*=FFFFFF] { fill:red; }
    // Our colorizer will change the element's fill attribute to red,
    // but now the stylesheet rule would no longer apply, effectively
    // reverting the change for any subsequent PNG render.
    //
    // This will also ensure the resultant stand-alone SVG file matches
    // the generate PNG
    if (style) {
      document.head.removeChild(style);
    }

    return;

  }, function (result) {

    done(null, data);
  }, data.options, stylesheet);
};
