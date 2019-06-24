'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _constLoggingLevels = require("./const/LoggingLevels");

var _constLoggingLevels2 = _interopRequireDefault(_constLoggingLevels);

var SlackMessage = (function () {
  function SlackMessage() {
    _classCallCheck(this, SlackMessage);

    var slackNode = require('slack-node');
    this.slack = new slackNode();
    this.slack.setWebhook(_config2['default'].webhookUrl);
    this.loggingLevel = _config2['default'].loggingLevel;
    this.messages = [];
    this.errorMessages = [];
  }

  _createClass(SlackMessage, [{
    key: 'addMessage',
    value: function addMessage(message) {
      this.messages.push(message);
    }
  }, {
    key: 'addErrorMessage',
    value: function addErrorMessage(message) {
      this.errorMessages.push(message);
    }
  }, {
    key: 'sendMessage',
    value: function sendMessage(message) {
      var slackProperties = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

      this.slack.webhook(Object.assign({
        channel: _config2['default'].channel,
        username: _config2['default'].username,
        text: message
      }, slackProperties), function (err, response) {
        if (!_config2['default'].quietMode) {
          if (err) {
            console.log('Unable to send a message to slack');
            console.log(response);
          } else {
            console.log('The following message is send to slack: \n ' + message);
          }
        }
      });
    }
  }, {
    key: 'sendTestReport',
    value: function sendTestReport(nrFailedTests) {
      this.sendMessage(this.getTestReportMessage(), nrFailedTests > 0 && this.loggingLevel === _constLoggingLevels2['default'].TEST ? {
        "attachments": [{
          color: 'danger',
          text: nrFailedTests + ' test failed'
        }]
      } : null);
    }
  }, {
    key: 'getTestReportMessage',
    value: function getTestReportMessage() {
      var message = this.getSlackMessage();
      var errorMessage = this.getErrorMessage();

      if (errorMessage.length > 0 && this.loggingLevel === _constLoggingLevels2['default'].TEST) {
        message = message + "\n\n\n```" + this.getErrorMessage() + '```';
      }
      return message;
    }
  }, {
    key: 'getErrorMessage',
    value: function getErrorMessage() {
      return this.errorMessages.join("\n\n\n");
    }
  }, {
    key: 'getSlackMessage',
    value: function getSlackMessage() {
      return this.messages.join("\n");
    }
  }]);

  return SlackMessage;
})();

exports['default'] = SlackMessage;
module.exports = exports['default'];