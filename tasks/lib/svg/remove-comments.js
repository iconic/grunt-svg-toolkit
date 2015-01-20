'use strict';

module.exports = function ($, data, done) {

  function isComment(index, node) {
    return node.type === 'comment';
  }

  // Check for XML root level comments, like Illustrator adds
  $.root()
    .contents()
    .filter(isComment)
    .remove();

  // and sweep the SVG itself for comments
  $('*')
    .contents()
    .filter(isComment)
    .remove();

  done(null, $, data);
};
