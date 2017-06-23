'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _SlackMessage = require('./SlackMessage');

var _SlackMessage2 = _interopRequireDefault(_SlackMessage);

exports['default'] = function () {
    return {

        noColors: true,

        reportTaskStart: function reportTaskStart(startTime, userAgents, testCount) {
            this.slack = new _SlackMessage2['default']();
            this.startTime = startTime;
            this.testCount = testCount;

            this.slack.sendMessage('Starting testcafe ' + startTime + '. \n Running tests in: ' + userAgents);
        },

        reportFixtureStart: function reportFixtureStart(name, path) {
            this.currentFixtureName = name;
            this.slack.addMessage(this.currentFixtureName);
        },

        reportTestDone: function reportTestDone(name, testRunInfo) {
            var hasErr = testRunInfo.errs.length > 0;
            var result = hasErr ? ':heavy_multiplication_x:' : ':heavy_check_mark: ';

            this.slack.addMessage(result + ' ' + name);

            if (hasErr) {
                this.renderErrors(testRunInfo.errs);
            }
        },

        renderErrors: function renderErrors(errors) {
            var _this = this;

            errors.forEach(function (error, id) {
                _this.slack.addErrorMessage(_this.formatError(error, id + 1 + ' '));
            });
        },

        reportTaskDone: function reportTaskDone(endTime, passed, warnings) {
            var durationMs = endTime - this.startTime;
            var durationStr = this.moment.duration(durationMs).format('h[h] mm[m] ss[s]');
            var footer = passed === this.testCount ? this.testCount + ' passed' : this.testCount - passed + '/' + this.testCount + ' failed';

            footer = '\n*' + footer + '* (Duration: ' + durationStr + ')';

            this.slack.addMessage(footer);
            this.slack.sendTestReport(this.testCount - passed);
        }
    };
};

module.exports = exports['default'];