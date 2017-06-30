# TestCafe Reporter Slack 
###testcafe-reporter-slack

This is a reporter for [TestCafe](http://devexpress.github.io/testcafe). It sends the output of the test to slack. 

##Purpose
Once configured the repoter sends test results to Slack depending on a .env file from the folder the tests are run from

##Setup instructions
Follow the instructions bellow to configure this plugin. 
	
First install this package globaly to the machine you would like to run your tests on and then:

## Testing
Running TestCafe with testcafe-reporter-slack.

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
$ testcafe chrome 'path/to/test/file.js' --reporter slack
```

When you use TestCafe API, you can pass the reporter name to the `reporter()` method:

```js
testCafe
    .createRunner()
    .src('path/to/test/file.js')
    .browsers('chrome')
    .reporter('slack') // <-
    .run();
```

##Further Documentation
[TestCafe Reporter Plugins](https://devexpress.github.io/testcafe/documentation/extending-testcafe/reporter-plugin/)
