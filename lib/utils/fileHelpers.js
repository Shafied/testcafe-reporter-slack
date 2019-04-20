'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var resolvePath = function resolvePath(path) {
  return (0, _path.resolve)(process.cwd(), path);
};

exports.resolvePath = resolvePath;
var isFileExists = function isFileExists(path) {
  return _fs2['default'].existsSync(path);
};

exports.isFileExists = isFileExists;
var readFile = function readFile(filePath) {
  return _fs2['default'].readFileSync(filePath);
};
exports.readFile = readFile;