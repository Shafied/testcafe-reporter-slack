import config from './config';
import SlackMessage from './SlackMessage';
import LoggingLevels from './const/LoggingLevels';
import emojis from './utils/emojis';
import { bold, italics } from './utils/textFormatters';

const { loggingLevel } = config;

export default function () {
  return {

    noColors: true,

    reportTaskStart(startTime, userAgents, testCount) {
      this.slack = new SlackMessage();
      this.startTime = startTime;
      this.testCount = testCount;

      const startTimeFormatted = this.moment(this.startTime).format('M/D/YYYY h:mm:ss a');

      this.slack.sendMessage(`${emojis.rocket} ${'Starting TestCafe:'} ${bold(startTimeFormatted)}\n${emojis.computer} Running ${bold(testCount)} tests in: ${bold(userAgents)}\n`)
    },

    reportFixtureStart(name, path) {
      this.currentFixtureName = name;

      if (loggingLevel === LoggingLevels.TEST) this.slack.addMessage(bold(this.currentFixtureName));
    },

    reportTestDone(name, testRunInfo) {
      const hasErr = !!testRunInfo.errs.length;
      let message = null;

      if (testRunInfo.skipped) {
        message = `${emojis.fastForward} ${italics(name)} - ${bold('skipped')}`;
      } else if (hasErr) {
        message = `${emojis.fire} ${italics(name)} - ${bold('failed')}`;
        this.renderErrors(testRunInfo.errs);
      } else {
        message = `${emojis.checkMark} ${italics(name)}`
      }

      if (loggingLevel === LoggingLevels.TEST) this.slack.addMessage(message);
    },

    renderErrors(errors) {
      errors.forEach((error, id) => {
        this.slack.addErrorMessage(this.formatError(error, `${id + 1} `));
      })
    },

    reportTaskDone(endTime, passed, warnings, result) {
      const endTimeFormatted = this.moment(endTime).format('M/D/YYYY h:mm:ss a');
      const durationMs = endTime - this.startTime;
      const durationFormatted = this.moment
        .duration(durationMs)
        .format('h[h] mm[m] ss[s]');

      const finishedStr = `${emojis.finishFlag} Testing finished at ${bold(endTimeFormatted)}\n`;
      const durationStr = `${emojis.stopWatch} Duration: ${bold(durationFormatted)}\n`;
      let summaryStr = '';

      if (result.skippedCount) summaryStr += `${emojis.fastForward} ${bold(`${result.skippedCount} skipped`)}\n`;

      if (result.failedCount) {
        summaryStr += `${emojis.noEntry} ${bold(`${result.failedCount}/${this.testCount} failed`)}`
      } else {
        summaryStr += `${emojis.checkMark} ${bold(`${result.passedCount}/${this.testCount} passed`)}`
      }

      const message = `\n\n${finishedStr} ${durationStr} ${summaryStr}`;

      this.slack.addMessage(message);
      this.slack.sendTestReport(this.testCount - passed);
    }
  }
}
