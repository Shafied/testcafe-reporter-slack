import config from './config';
import loggingLevels from "./const/loggingLevels";

const {
  slackWebhook,
  slackChannel,
  slackUsername,
  loggingLevel,
  quietMode
} = config;

export default class SlackMessage {
    constructor() {
        let slackNode = require('slack-node');
        this.slack = new slackNode();
        this.slack.setWebhook(slackWebhook);
        this.loggingLevel = loggingLevel;
        this.messages = [];
        this.errorMessages = [];
    }

    addMessage(message) {
        this.messages.push(message)
    }

    addErrorMessage(message) {
        this.errorMessages.push(message)
    }

    sendMessage(message, slackProperties = null) {
        this.slack.webhook(Object.assign({
            channel: slackChannel,
            username: slackUsername,
            text: message
        }, slackProperties), function (err, response) {
            if (!quietMode) {
              if(err) {
                console.log('Unable to send a message to slack');
                console.log(response);
              } else {
                console.log(`The following message is send to slack: \n ${message}`);
              }
            }
        })
    }

    sendTestReport(nrFailedTests) {
        this.sendMessage(this.getTestReportMessage(), nrFailedTests > 0 && this.loggingLevel === loggingLevels.TEST
            ? {
                "attachments": [{
                    color: 'danger',
                    text: `${nrFailedTests} test failed`
                }]
            }
            : null
        )
    }

    getTestReportMessage() {
        let message = this.getSlackMessage();
        let errorMessage = this.getErrorMessage();

        if (errorMessage.length > 0 && this.loggingLevel === loggingLevels.TEST) {
            message = message + "\n\n\n```" + this.getErrorMessage() + '```';
        }
        return message;
    }

    getErrorMessage() {
        return this.errorMessages.join("\n\n\n");
    }

    getSlackMessage() {
        return this.messages.join("\n");
    }
}
