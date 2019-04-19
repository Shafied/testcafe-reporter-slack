'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _constLoggingLevels = require('./const/loggingLevels');

var _constLoggingLevels2 = _interopRequireDefault(_constLoggingLevels);

require('dotenv').config();

var config = {
  slackWebhook: process.env.TESTCAFE_SLACK_WEBHOOK || 'https://hooks.slack.com/services/*****',
  slackChannel: process.env.TESTCAFE_SLACK_CHANNEL || '#testcafe',
  slackUsername: process.env.TESTCAFE_SLACK_USERNAME || 'testcafebot',
  loggingLevel: process.env.TESTCAFE_SLACK_LOGGING_LEVEL || _constLoggingLevels2['default'].TEST,
  quietMode: process.env.TESTCAFE_SLACK_QUIET_MODE || false
};

exports['default'] = config;
module.exports = exports['default'];