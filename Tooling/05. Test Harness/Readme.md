# Test Harness

Adopting a test harness and understanding how to use it properly will be **absolutely critical** to your future success as an engineer. A solid testing harness and a robust test suite will allow you to move quickly and without fear when you make changes.

## Needed Tools

1. Version Control
2. Programming Language/Platform
3. Linter

## Setup

1. Ensure that `node >= 8.6` is installed
2. Run `npm install`
3. Run `npm test`, you should expect to see all tests passing and some code coverage

## Goals

Our goals in the following exercises are:

1. Familiarize ourselves with the setup of test harness tooling
2. Familiarize ourselves with the vocabulary of test harnesses and expectations
3. Develop best habits in leveraging test harnesses
4. Develop skills in writing robust tests

## Steps

Our steps will be the following:

1. Set up test harness using `mocha` and combine with our linter
2. Learn about how to set up a simple test
3. Learn about how to include external code and expect results from that code
4. Set up more advanced test harness features like watching files and automatically rerunning tests when files are changed
5. Deep dive into good testing practice

### Setting Up Our Testing Harness

We're going to use `mocha` in this example but other harnesses like `jest` work similarly. If you prefer to use something else instead, please feel free to do so. The exact tooling is not as important as understanding the general process and purpose of the tooling.

In order to complete this step, please accomplish the following:

1. Install `mocha` locally using `npm install mocha --save-dev`
2. Install `chai` locally using `npm install chai --save-dev`
3. Run mocha locally on the existing tests with `./node_modules/.bin/mocha tests`
4. Add the tests folder to the directories in `package.json` and add a script with key `"test"` with the value `"npm run test:lint && ./node_modules/.bin/mocha tests"`.
5. Run the tests using `npm test`

### Setting Up a Simple Test

We're going to set up some basic tests without using any external dependencies at first in order to develop a basic understanding of the structure of test files and the use of expectations. We're using `chai` for expectations but other libraries will work as well.

Please perform the below in order:

1. Add tests to `tests/math.test.js` for the cases of subtraction, multiplication, division, and modulo (`%`).
2. Run your tests in between each new case with `npm test` to ensure all of your tests are passing

### Including External Code to Test

We're going to get a little more advanced and include an external file to test. This is the standard pattern that you will see across many codebases where there is separation of the test file and the code under test.

Please perform the below in order:

1. Add tests to `tests/math_util.test.js` for the cases of subtraction, multiplication, division, and modulo
2. Run your tests in between each new case with `npm test` to ensure all of your tests are passing

### Setting up Advanced Harness Features

We're going to upgrade our test harness to add the watch feature, which means that our tests will respond to changes in the file. If we modify any of the files, the tests will automatically be rerun so no more need to manually run `npm test` every time we make a change. This will allow us to move even faster.

Please perform the below in order:

1. Install `nodemon` which will allow us to run commands in response to file changes
2. Add a script to `package.json` with the key `"test:watch"` and value `"./node_modules/.bin/nodemon -x 'npm test'"`
3. Run `npm test:watch` in order to start watching
4. Change a test file or code file and watch the tests get rerun automatically!

### Good Testing Practice

We're going to discuss good testing practices both in terms of using the tooling as well as the practice of writing robust test cases for our code.

#### Tooling Practices

Below are the set of test harness practices you should adopt in order to be highly effective:

1. Develop with watch mode on to limit the amount of manual work you need to do in order to run your tests.
2. Run your tests before making a commit to ensure that the code passes all current tests.
3. Run and understand current tests before making a change to get an understanding of what could go wrong when making changes.
4. Start your exploration of code behavior with test cases to supplement your use of `console.log` and breakpoints. They are a good time investment because you can continue to rely on the cases you write. Breakpoints and `console.logs` are deleted after code is committed.

#### [WIP] Test Case Practices

Below are the set of practices when writing test cases to keep in mind so we can produce robust and effective test cases that will be the advanced notice we get before a wrong behavior is introduced into our code. They are:

1. Write a failing test before making it successful
2. Learn how to test normal functions, promise, and callback based code
3. Learn how to expect errors
4. Learn how to prevent bugs in test code