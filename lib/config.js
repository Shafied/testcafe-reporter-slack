'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilsFileHelpers = require('./utils/fileHelpers');

var _constLoggingLevels = require('./const/LoggingLevels');

var _constLoggingLevels2 = _interopRequireDefault(_constLoggingLevels);

require('dotenv').config();

var defaultConfig = {
  webhookUrl: process.env.TESTCAFE_SLACK_WEBHOOK || 'https://hooks.slack.com/services/*****',
  channel: process.env.TESTCAFE_SLACK_CHANNEL || '#testcafe',
  username: process.env.TESTCAFE_SLACK_USERNAME || 'testcafebot',
  loggingLevel: process.env.TESTCAFE_SLACK_LOGGING_LEVEL || _constLoggingLevels2['default'].TEST,
  quietMode: process.env.TESTCAFE_SLACK_QUIET_MODE || false
};

var testCafeConfigFilePath = (0, _utilsFileHelpers.resolvePath)('.testcaferc.json');

var loadReporterConfig = function loadReporterConfig() {
  if (!(0, _utilsFileHelpers.isFileExists)(testCafeConfigFilePath)) {
    return defaultConfig;
  }

  var configRawData = null;

  try {
    configRawData = (0, _utilsFileHelpers.readFile)(testCafeConfigFilePath);
  } catch (err) {
    return defaultConfig;
  }

  try {
    var testCafeConfig = JSON.parse(configRawData);

    return testCafeConfig.reporter.find(function (obj) {
      return obj.name === 'slack';
    });
  } catch (err) {
    return defaultConfig;
  }
};

var reporterConfig = loadReporterConfig();
var config = _extends({}, defaultConfig, reporterConfig.options);

exports['default'] = config;
module.exports = exports['default'];