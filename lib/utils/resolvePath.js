'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _path = require('path');

exports['default'] = function (path) {
  return (0, _path.resolve)(process.cwd(), path);
};

module.exports = exports['default'];