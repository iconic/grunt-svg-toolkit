'use strict';

module.exports = function ($, data, done) {
  var $svg = $('svg');

  // Remove deprecated 'enable-background' attribute
  // http://www.w3.org/TR/filter-effects/#AccessBackgroundImage
  $svg.removeAttr('enable-background');

  // Remove Adobe Illustrator image metadata
  // :NOTE: Cheerio doesn't do namespaces, so we'll just do this...
  $svg.find('#adobe_illustrator_pgf').remove();

  // instead of this...
  // (which we _could_ do with PhantomJS, if needed)
  //
  // var adobeMetadata = $svg[0].getElementsByTagNameNS('*', 'pgf');
  // [].forEach.call(adobeMetadata, function (item) {
  //   console.log("Removing AI metadata");
  //   item.parentNode.removeChild(item);
  // });

  // :TODO: Can we safely remove some foreignObject tags?
  //
  // :NOTE: These selectors don't seem to work in PhantomJS
  // https://github.com/ariya/phantomjs/issues/10925
  // var foreignObjects = element.querySelectorAll('foreignObject, foreignobject');
  //     [].forEach.call(foreignObjects, function (item) {
  //   item.parentNode.removeChild(item);
  // });

  done(null, $, data);
};
