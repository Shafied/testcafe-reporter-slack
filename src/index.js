import SlackMessage from './SlackMessage';

export default function () {
    return {

        noColors: false,

        reportTaskStart (startTime, userAgents, testCount) {
            this.slack = new SlackMessage();
            this.startTime = startTime;
            this.testCount = testCount;

            this.slack.addMessage(`Running tests in: ${userAgents}`);
        },

        reportFixtureStart (name, path) {
            this.currentFixtureName = name;
        },

        reportTestDone (name, testRunInfo) {
            const hasErr = !!testRunInfo.length;
            const result = hasErr ? `passed` : `failed`;

            name = `${this.currentFixtureName} - ${name}`;

            const title = `${result} ${name}`;

            this.slack.addMessage(title);
        },

        reportTaskDone (endTime, passed, warnings) {
            const durationMs  = endTime - this.startTime;
            const durationStr = this.moment
                .duration(durationMs)
                .format('h[h] mm[m] ss[s]');
            let footer = passed === this.testCount ?
                `${this.testCount} passed` :
                `${this.testCount - passed}/${this.testCount} failed`;

            footer += ` (Duration: ${durationStr})`;

            this.slack.addMessage(footer)
            this.slack.sendTestReport()
        }
    };
}
