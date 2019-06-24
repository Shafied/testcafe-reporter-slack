require('dotenv').config();

import {
  resolvePath,
  isFileExists,
  readFile
} from './utils/fileHelpers';
import LoggingLevels from './const/LoggingLevels';

const defaultConfig = {
  webhookUrl: process.env.TESTCAFE_SLACK_WEBHOOK || 'https://hooks.slack.com/services/*****',
  channel: process.env.TESTCAFE_SLACK_CHANNEL || '#testcafe',
  username: process.env.TESTCAFE_SLACK_USERNAME || 'testcafebot',
  loggingLevel: process.env.TESTCAFE_SLACK_LOGGING_LEVEL || LoggingLevels.TEST,
  quietMode: process.env.TESTCAFE_SLACK_QUIET_MODE || false
};

const testCafeConfigFilePath = resolvePath('.testcaferc.json');

const loadReporterConfig = () => {
  if (!isFileExists(testCafeConfigFilePath)) {
    return defaultConfig;
  }

  let configRawData = null;

  try {
    configRawData = readFile(testCafeConfigFilePath);
  } catch (err) {
    return defaultConfig;
  }

  try {
    let testCafeConfig = JSON.parse(configRawData);

    return testCafeConfig.reporter.find(obj => obj.name === 'slack');
  } catch (err) {
    return defaultConfig;
  }
};

const reporterConfig = loadReporterConfig();
const config = {...defaultConfig, ...reporterConfig.options};

export default config;
