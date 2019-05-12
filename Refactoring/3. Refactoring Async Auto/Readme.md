# Refactoring Async Auto

`async.auto` is very tricky to deal with in practice when refactoring because it **IS CONTROL FLOW LOGIC** but it's not always easy to see. A simple example can be seen below:

```
const async = require('async');

function f (callback) {
    async.auto({
        a: (next) => {
            next(null, '1234');
        },
        b: ['a', (results, next) => {
            next(null, results.a + 'b');
        }],
        c: ['b', (results, next) => {
            next(null, results.a + 'c');
        }],
        d: ['a', (results, next) => {
            next(null, results.a + 'd');
        }]
    }, (err, results) => {
        if (err) {
            return callback(err);
        }

        callback(null, results.c);
    });
}

f(console.log); // null, '1234c'
```

There are a lot of problems with the code above:

1. Control flow is not clear
2. Variable usage is not clear
3. Not all results are returned

If we refactor this code using `async/await` we can see a much more simplified view of the flow of the code:

```
async function f () {
    const a = '1234';
    const b = a + 'b';
    const d = a + 'd';
    const c = a + 'c';

    return c;
}
```

There are a few advantages of this:

1. It's easy to read and is clear it's linear
2. Our linter can tell us that we have 2 unused variables, `b` and `d`

In this exercise, we are going to focus on refactoring a difficult `async.auto` piece of code. I hope you enjoy it!

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

1. Split `async.auto` logic into `async/await` style control flow
2. Split control flow and functional logic and test them separately
3. Improve readability and maintainability of control flow and functional logic
4. Ensure that each change we make is 100% safe and will not change the behavior of the code

### Steps

In order to achieve these goals, we will follow a similar set of steps that we have used before. Given we've gone through the individual steps in earlier exercises, we'll move faster for this exercise:

1. Reach 100% line coverage of `src/generate_report.js` by adding tests to `tests/generate_report.test.js`.
2. Isolate each step of `async.auto` control flow into pure functional logic and make sure to inject any dependencies. Test these isolated steps to 100% branch and line coverage.
3. Isolate `async.auto` control flow into pure functional logic (including validation logic) and inject any external functions and test to 100% line and branch coverage
4. Replace isolated `async.auto` control flow with `async/await` and promisify any injected functions
5. Refactor isolated steps of original `async.auto` control flow from `step 2` into `async/await`
6. Pull out pure functional logic from isolated steps and test independently
7. Clean up function and variable naming and logic structure
