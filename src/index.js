import SlackMessage from './SlackMessage'

export default function () {
    return {

        noColors: false,

        reportTaskStart (startTime, userAgents, testCount) {
            this.slack = new SlackMessage()
            this.startTime = startTime
            this.testCount = testCount

            this.slack.sendMessage(`Starting testcafe ${startTime}. \n Running tests in: ${userAgents}`)
        },

        reportFixtureStart (name, path) {
            this.currentFixtureName = name
            this.slack.addMessage(this.currentFixtureName)
        },

        reportTestDone (name, testRunInfo) {
            const hasErr = testRunInfo.errs.length > 0
            const result = hasErr ? '_x_' : '_v_'

            this.slack.addMessage(`${result} ${name}`)
        },

        reportTaskDone (endTime, passed, warnings) {
            const durationMs  = endTime - this.startTime
            const durationStr = this.moment
                .duration(durationMs)
                .format('h[h] mm[m] ss[s]')
            let footer = passed === this.testCount ?
                `${this.testCount} passed` :
                `${this.testCount - passed}/${this.testCount} failed`

            footer = `*${footer}* (Duration: ${durationStr})`

            this.slack.addMessage(footer)
            this.slack.sendTestReport()
        }
    }
}
