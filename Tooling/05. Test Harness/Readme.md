# Test Harness

Adopting a test harness and understanding how to use it properly will be **absolutely critical** to your future success as an engineer. A solid testing harness and a robust test suite will allow you to move quickly and without fear when you make changes.

## Needed Tools

1. Version Control
2. Programming Language/Platform
3. Linter
4. Test Harness
5. Code Coverage Tool

## Setup

1. Ensure that `node >= 8.6` is installed
2. Run `npm install`
3. Run `npm test`, you should expect to see all tests passing and some code coverage
4. Run `npm run report` to see the coverage reports

## Exercise

### Goals

Our goals in the following exercises are:

1. Familiarize ourselves with the setup of test harness tooling
2. Familiarize ourselves with the vocabulary of test harnesses and expectations
3. Develop best habits in leveraging test harnesses
4. Develop skills in writing robust tests

### Steps

Our steps will be the following:

1. Set up test harness using `mocha` and combine with our linter
2. Learn about how to set up a simple test
3. Learn about how to include external code and expect results from that code
4. Set up more advanced test harness features like watching files and automatically rerunning tests when files are changed
5. Deep dive into good testing practice