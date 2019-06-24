"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var bold = function bold(text) {
  return "*" + text + "*";
};

exports.bold = bold;
var italics = function italics(text) {
  return "_" + text + "_";
};

exports.italics = italics;
var strike = function strike(text) {
  return "~" + text + "~";
};

exports.strike = strike;
var code = function code(text) {
  return "`" + text + "`";
};

exports.code = code;
var quote = function quote(text) {
  return ">" + text;
};
exports.quote = quote;