# Kifid TestCafe Reporter 
###testcafe-reporter-ki-reporter

This is the **ki-reporter** reporter plugin for [TestCafe](http://devexpress.github.io/testcafe).

##Purpose
Once configured the ki-reporte sends test results to Slack.

##Setup instructions
Since this plugin is not published as a TestCafe reporter to npmjs.org. It is important to follow below steps to make it available to your globally installed TestCafe node executable:
	
First clone this repository to the machine you would like to run your tests on and then:

```
$ cd ki-reporter
$ npm install
$(sudo) npm link 
```

With above steps you make the reporter globally available to TestCafe.

## Testing
Running TestCafe with ki-reporter.

In order to use this TestCafe reporter plugin it is necessary to define .env variables in your test project, hence the folder from where your call TestCafe.

- cd into your test project.
- Edit or create the .env file by adding the following ki-reporter required variables:

```
TESTCAFE_SLACK_WEBHOOK=https://hooks.slack.com/services/*****
TESTCAFE_SLACK_CHANNEL='#testcafe'
TESTCAFE_SLACK_USERNAME=testcafebot
```

Now run your tests from the commmand line with the ki-reporter specified, e.g.:

```
$ testcafe chrome 'path/to/test/file.js' --reporter ki-reporter
```

When you use TestCafe API, you can pass the reporter name to the `reporter()` method:

```js
testCafe
    .createRunner()
    .src('path/to/test/file.js')
    .browsers('chrome')
    .reporter('ki-reporter') // <-
    .run();
```

##Further Documentation
[TestCafe Reporter Plugins](https://devexpress.github.io/testcafe/documentation/extending-testcafe/reporter-plugin/)


