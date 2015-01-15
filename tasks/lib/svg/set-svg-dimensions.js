'use strict';

module.exports = function ($, data, done) {
  /*
   * Set SVG dimensions based on the size of icons at a normalized scale
   */

  var widthSm, heightSm, widthMd, heightMd, widthLg, heightLg, widthMax, heightMax;

  widthSm = Number($('.iconic-sm').attr('data-width')) * 8;
  heightSm = Number($('.iconic-sm').attr('data-height')) * 8;

  widthMd = Number($('.iconic-md').attr('data-width')) * 4;
  heightMd = Number($('.iconic-md').attr('data-height')) * 4;

  widthLg = Number($('.iconic-lg').attr('data-width'));
  heightLg = Number($('.iconic-lg').attr('data-height'));

  widthMax = Math.max(widthSm, widthMd, widthLg);
  heightMax = Math.max(heightSm, heightMd, heightLg);

  $('svg').attr('width', widthMax + 'px');
  $('svg').attr('height', heightMax + 'px');
  $('svg').attr('viewBox', '0 0 ' + widthMax + ' ' + heightMax);
  $('svg').attr('viewbox', null);

  done(null, $, data);
};
