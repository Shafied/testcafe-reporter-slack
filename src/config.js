require('dotenv').config();

import loggingLevels from './const/loggingLevels';

const config = {
  slackWebhook: process.env.TESTCAFE_SLACK_WEBHOOK || 'https://hooks.slack.com/services/*****',
  slackChannel: process.env.TESTCAFE_SLACK_CHANNEL || '#testcafe',
  slackUsername: process.env.TESTCAFE_SLACK_USERNAME || 'testcafebot',
  loggingLevel: process.env.TESTCAFE_SLACK_LOGGING_LEVEL || loggingLevels.TEST,
  quietMode: process.env.TESTCAFE_SLACK_QUIET_MODE || false
};

export default config;
