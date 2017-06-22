export default class SlackMessage {
    constructor() {
        let slackNode = require('slack-node')
        this.slack = new slackNode()
        this.slack.setWebhook('https://hooks.slack.com/services/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')
        this.message = []
    }

    addMessage(message) {
        this.message.push(message)
    }

    sendMessage(message) {
        this.slack.webhook({
            channel:  '#testcafe',
            username: 'testcafebot',
            text: message
        }, function (err, response) {
            if(err) {
                console.log('Unable to send a message to slack')
                console.log(response)
            } else {
                console.log(`The following message is send to slack: \n ${message}`)
            }
        })
    }

    sendTestReport() {
        this.sendMessage(this.getSlackMessage());

    }

    getSlackMessage() {
        return this.message.join("\n")
    }
}