import SlackMessage from './SlackMessage'
import emojis from 'utils/emojis';
import { bold, italics } from 'utils/textFormatters';

export default function () {
    return {

        noColors: true,

        reportTaskStart (startTime, userAgents, testCount) {
            this.slack = new SlackMessage();
            this.startTime = startTime;
            this.testCount = testCount;

            this.slack.sendMessage(`${emojis.rocket} ${bold('Starting TestCafe:')} ${startTime}. \n${emojis.computer} Running tests in: ${bold(userAgents)}`)
        },

        reportFixtureStart (name, path) {
            this.currentFixtureName = name;
            this.slack.addMessage(this.currentFixtureName);
        },

        reportTestDone (name, testRunInfo) {
            const hasErr = testRunInfo.errs.length > 0;
            const result = hasErr ? `${emojis.fire} ` : `${emojis.checkMark} `;

            this.slack.addMessage(`${result} ${italics(name)}`);

            if (hasErr) {
                this.renderErrors(testRunInfo.errs);
            }
        },

        renderErrors(errors) {
            errors.forEach((error, id) => {
                this.slack.addErrorMessage(this.formatError(error, `${id + 1} `));
            })
        },

        reportTaskDone (endTime, passed, warnings) {
            const durationMs  = endTime - this.startTime;
            const durationStr = this.moment
                .duration(durationMs)
                .format('h[h] mm[m] ss[s]');
            let footer = passed === this.testCount ?
                `${emojis.checkMark} ${this.testCount} passed` :
                `${emojis.noEntry} ${this.testCount - passed}/${this.testCount} failed`;

            footer = `\n${bold(footer)} \n${emojis.stopWatch} Duration: ${bold(durationStr)}`;

            this.slack.addMessage(footer);
            this.slack.sendTestReport(this.testCount - passed);
        }
    }
}
