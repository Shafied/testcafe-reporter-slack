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

    sendTestReport() {
        console.log(this.getSlackMessage());
        this.slack.webhook({
            channel:  '#testcafe',
            username: 'testcafebot',
            text: this.getSlackMessage()
        }, function (err, response) {
            console.log('ik zou iets geslacked meoten hebben');
            console.log(err)
            console.log(response)
        })
    }

    getSlackMessage() {
        return this.message.join("\n")
    }
}