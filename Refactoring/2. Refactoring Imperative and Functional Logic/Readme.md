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
4. Test Harness
5. Code Coverage Tool

## Setup

1. Ensure that `node >= 8.6` is installed
2. Run `npm install`
3. Run `npm test`, all tests should be passing
4. Run `npm run report` to see the coverage reports
5. Run `npm run test:watch` to have tests automatically rerun when changes are made

## Exercise

### Goals

Our goals in the following exercise are:

1. Split control flow and functional logic and create separate tests for them
2. Improve readability and maintainability of control flow and functional logic
3. Ensure that each change we make is 100% safe and will not change the behavior of the code

### Steps

In order to achieve these goals, we need to go through a few steps:

1. Reach 100% line coverage
2. Isolate functional logic from control flow
3. Refactor control flow
4. Refactor functional logic
5. Remove control flow
6. Clean up readability including function and variable naming

#### Achieving Line Coverage

Solutions: `1`

Our first task is to write enough tests so we can reach 100% line coverage. Try to write the fewest number of tests to achieve this.

Reference the fixtures in the tests folder to use in your tests when relevant.

#### Isolate Functional Logic from Control Flow

Solutions: `2-5`

This step is critical in our success in refactoring code that has imperative and functional logic mixed together like this.

The approach that is advised is to:

1. Isolate reading files
2. Isolate building combined file
3. Isolate writing output file
4. Isolate control flow

#### Refactor Control Flow

Solutions: `6`

This step is the process of changing the control flow to use `async/await`.

#### Refactor Functional Logic

Solutions: `7-9`

In these tasks, we need to refactor the functional logic to use `async/await`

1. Refactor read files to be async
2. Refactor write files to be async
3. Convert `combineFiles` to be async

#### Remove Control Flow

Solutions: `10`

We don't need a custom control flow function from here so we can simply remove it.

#### Clean up readability

There are a few more tasks that need to be done at this point which will be left as an exercise for the reader. Among many refactors, the reader can consider:

1. Cleaning up function naming
2. Cleaning up variable naming
3. Cleaning up the build combined file logic
4. Moving validation logic into separate function
5. Removing unnecessary tests at `combineFiles` level

### Conclusion

Congratulations! You've finished the second refactoring exercise. This exercise was significantly more difficult as it had both imperative control flow as well as tricky functional logic.

#### Main Takeaways

1. No matter how difficult the code may initially look, as long as you believe that there are no bugs, you can begin the refactoring process by aiming for 100% line coverage.
2. Isolating functional logic will help you greatly later on in terms of being able to properly isolate the control flow and transform it into `async/await`
3. After control flow has been cleaned up, you can go into the individual units and clean up naming and logic