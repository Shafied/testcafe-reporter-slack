# testcafe-reporter-ki-slack-reporter

This is the **k3-reporter** reporter plugin for [TestCafe](http://devexpress.github.io/testcafe).

<p align="center">
    <img src="https://raw.github.com/shafied/testcafe-reporter-k3-reporter/master/media/preview.png" alt="preview" />
</p>

## .env configuration:

Add the below .env config to your test project from which you call the ki-slack-reporter

TestCafe //TODO: To be moved to new test project holistically testing both k3 + mk2...

    TESTCAFE_SLACK_WEBHOOK=https://hooks.slack.com/services/*****
    TESTCAFE_SLACK_CHANNEL='#testcafe'
    TESTCAFE_SLACK_USERNAME=testcafebot

## Install

```
npm install testcafe-reporter-k3-reporter
```

## Usage

When you run tests from the command line, specify the reporter name by using the `--reporter` option:

```
testcafe chrome 'path/to/test/file.js' --reporter k3-reporter
```


When you use API, pass the reporter name to the `reporter()` method:

```js
testCafe
    .createRunner()
    .src('path/to/test/file.js')
    .browsers('chrome')
    .reporter('k3-reporter') // <-
    .run();
```

## Author
Shafied 



