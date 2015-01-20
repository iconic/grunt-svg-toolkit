'use strict';

module.exports = function ($, data, done) {
  var $svg = $('svg');

  // Default to 256x256 if there is no viewBox
  // :TODO: Make this a config setting
  var viewBox = $svg.attr('viewBox') || '0 0 256 256';
  viewBox = viewBox.split(' ');

  var dimensions = {
    x: viewBox[0],
    y: viewBox[1],
    width: $svg.attr('width') || viewBox[2],
    height: $svg.attr('height') || viewBox[3]
  };

  $svg.attr('width', dimensions.width).attr('height', dimensions.height);

  done(null, $, data);
};
