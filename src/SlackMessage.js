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
        this.slack.webhook({
            channel:  '#testcafe',
            username: 'testcafebot',
            text: 'blabla' //this.getSlackMessage()
        }, function (err, response) {
            console.log('ik zou iets geslacked meoten hebben');
            console.log(err)
            console.log(response)
        })
        console.log('ik kom ook nog aan het einde')
    }

    getSlackMessage() {
        return this.message.join("\n")
    }
}