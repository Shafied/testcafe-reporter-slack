var assert           = require('assert');
var normalizeNewline = require('normalize-newline');
var read             = require('read-file-relative').readSync;
var OS               = require('os-family');
var createReport     = require('./utils/create-report');

it('Should produce report with colors', function () {
    var report       = createReport(true);
    var expectedFile = OS.win ? './data/report-with-colors-win.json' : './data/report-with-colors.json';
    var expected     = JSON.parse(read(expectedFile));

    report   = normalizeNewline(report).trim();
    expected = normalizeNewline(expected).trim();

    // assert.strictEqual(report, expected);
});

it('Should produce report without colors', function () {
    var report   = createReport(false);
    var expected = read('./data/report-without-colors');

    report   = normalizeNewline(report).trim();
    expected = normalizeNewline(expected).trim();

    // assert.strictEqual(report, expected);
});