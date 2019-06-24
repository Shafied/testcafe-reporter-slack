'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _SlackMessage = require('./SlackMessage');

var _SlackMessage2 = _interopRequireDefault(_SlackMessage);

var _constLoggingLevels = require('./const/LoggingLevels');

var _constLoggingLevels2 = _interopRequireDefault(_constLoggingLevels);

var _utilsEmojis = require('./utils/emojis');

var _utilsEmojis2 = _interopRequireDefault(_utilsEmojis);

var _utilsTextFormatters = require('./utils/textFormatters');

var loggingLevel = _config2['default'].loggingLevel;

exports['default'] = function () {
  return {

    noColors: true,

    reportTaskStart: function reportTaskStart(startTime, userAgents, testCount) {
      this.slack = new _SlackMessage2['default']();
      this.startTime = startTime;
      this.testCount = testCount;

      var startTimeFormatted = this.moment(this.startTime).format('M/D/YYYY h:mm:ss a');

      this.slack.sendMessage(_utilsEmojis2['default'].rocket + ' ' + 'Starting TestCafe:' + ' ' + (0, _utilsTextFormatters.bold)(startTimeFormatted) + '\n' + _utilsEmojis2['default'].computer + ' Running ' + (0, _utilsTextFormatters.bold)(testCount) + ' tests in: ' + (0, _utilsTextFormatters.bold)(userAgents) + '\n');
    },

    reportFixtureStart: function reportFixtureStart(name, path) {
      this.currentFixtureName = name;

      if (loggingLevel === _constLoggingLevels2['default'].TEST) this.slack.addMessage((0, _utilsTextFormatters.bold)(this.currentFixtureName));
    },

    reportTestDone: function reportTestDone(name, testRunInfo) {
      var hasErr = !!testRunInfo.errs.length;
      var message = null;

      if (testRunInfo.skipped) {
        message = _utilsEmojis2['default'].fastForward + ' ' + (0, _utilsTextFormatters.italics)(name) + ' - ' + (0, _utilsTextFormatters.bold)('skipped');
      } else if (hasErr) {
        message = _utilsEmojis2['default'].fire + ' ' + (0, _utilsTextFormatters.italics)(name) + ' - ' + (0, _utilsTextFormatters.bold)('failed');
        this.renderErrors(testRunInfo.errs);
      } else {
        message = _utilsEmojis2['default'].checkMark + ' ' + (0, _utilsTextFormatters.italics)(name);
      }

      if (loggingLevel === _constLoggingLevels2['default'].TEST) this.slack.addMessage(message);
    },

    renderErrors: function renderErrors(errors) {
      var _this = this;

      errors.forEach(function (error, id) {
        _this.slack.addErrorMessage(_this.formatError(error, id + 1 + ' '));
      });
    },

    reportTaskDone: function reportTaskDone(endTime, passed, warnings, result) {
      var endTimeFormatted = this.moment(endTime).format('M/D/YYYY h:mm:ss a');
      var durationMs = endTime - this.startTime;
      var durationFormatted = this.moment.duration(durationMs).format('h[h] mm[m] ss[s]');

      var finishedStr = _utilsEmojis2['default'].finishFlag + ' Testing finished at ' + (0, _utilsTextFormatters.bold)(endTimeFormatted) + '\n';
      var durationStr = _utilsEmojis2['default'].stopWatch + ' Duration: ' + (0, _utilsTextFormatters.bold)(durationFormatted) + '\n';
      var summaryStr = '';

      if (result.skippedCount) summaryStr += _utilsEmojis2['default'].fastForward + ' ' + (0, _utilsTextFormatters.bold)(result.skippedCount + ' skipped') + '\n';

      if (result.failedCount) {
        summaryStr += _utilsEmojis2['default'].noEntry + ' ' + (0, _utilsTextFormatters.bold)(result.failedCount + '/' + this.testCount + ' failed');
      } else {
        summaryStr += _utilsEmojis2['default'].checkMark + ' ' + (0, _utilsTextFormatters.bold)(result.passedCount + '/' + this.testCount + ' passed');
      }

      var message = '\n\n' + finishedStr + ' ' + durationStr + ' ' + summaryStr;

      this.slack.addMessage(message);
      this.slack.sendTestReport(this.testCount - passed);
    }
  };
};

module.exports = exports['default'];