# testcafe-reporter-k3-reporter
[![Build Status](https://travis-ci.org/shafied/testcafe-reporter-k3-reporter.svg)](https://travis-ci.org/shafied/testcafe-reporter-k3-reporter)

This is the **k3-reporter** reporter plugin for [TestCafe](http://devexpress.github.io/testcafe).

<p align="center">
    <img src="https://raw.github.com/shafied/testcafe-reporter-k3-reporter/master/media/preview.png" alt="preview" />
</p>

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
