const assert = require('assert');
const normalizeNewline = require('normalize-newline');
const read = require('read-file-relative').readSync;
const OS = require('os-family');
const createReport = require('./utils/create-report');

it('Should produce report with colors', function () {
  let report = createReport(true);
  const expectedFile = OS.win ? './data/report-with-colors-win.json' : './data/report-with-colors.json';
  let expected = JSON.parse(read(expectedFile));

  report = normalizeNewline(report).trim();
  expected = normalizeNewline(expected).trim();

  // assert.strictEqual(report, expected);
});

it('Should produce report without colors', function () {
  let report = createReport(false);
  let expected = read('./data/report-without-colors');

  report = normalizeNewline(report).trim();
  expected = normalizeNewline(expected).trim();

  // assert.strictEqual(report, expected);
});