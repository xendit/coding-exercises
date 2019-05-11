# Refactoring Imperative and Functional Logic

In real life, the majority of the time you will find code that has a mix of functional and imperative code. This code is more difficult to deal with than pure functional logic largely because you need to deal with external dependencies in order to properly test all of your code.

Some kinds of external dependencies may include:

1. Databases
2. Other servers
3. Message queues
4. Disk/file system

## Needed Tools

1. Version Control
2. Programming Language/Platform
3. Linter
4. Test Runner
5. Code Coverage Tool

## Setup

1. Ensure that `node >= 8.6` is installed
2. Run `npm install`
3. Run `npm test`, all tests should be passing

## Exercise

### Goals

Our goals in the following exercise are:

1. Split control flow and functional logic and create separate tests for them
2. Improve readability and maintainability of control flow and functional logic
3. Ensure that each change we make is 100% safe and will not change the behavior of the code

### Steps

In order to achieve these goals, we need to go through a few steps:

1. Reach 100% line coverage
2. Split functional logic from control flow
3. Reach 100% coverage on lines and branches in functional logic
4. Refactor functional logic
5. Improve readability and naming for control flow and functional logic

