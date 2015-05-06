'use strict';

module.exports = function ($, data, done) {
  // Elements on which we want to convert ids to classes...
  var shapesAndText = 'g,path,rect,circle,ellipse,line,polyline,polygon,altGlyph,textPath,text,tref,tspan';

  // ...but don't touch any in defs/clipPath/masks tags
  var excludeContainers = 'defs,clipPath,mask';

  function inExcludedContainer(index, node) {
    return $(node).parents(excludeContainers).length;
  }

  function convertIdToClass(index, node) {
    var id = $(node).attr('id');
    if (id) {
      $(node).addClass(id);
      $(node).removeAttr('id');
    }
  }

  $('svg').find(shapesAndText).not(inExcludedContainer).each(convertIdToClass);

  done(null, $, data);
};
