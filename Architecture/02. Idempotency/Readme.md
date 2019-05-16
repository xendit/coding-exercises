# Idempotency

Idempotency is a simple idea that has far reaching consequences. If understood and applied correctly, it allows us to build highly fault tolerant and systems where retries are always safe. From a software engineering definition, idempotency should be thought of as:

> The same input gives the same output

In practice, there are a variety of situations to understand and consider.

## Needed Tools

1. Version Control
2. Programming Language/Platform
3. Linter
4. Test Harness
5. Code Coverage Tool
6. Databases
7. Web Servers
8. Message Queues
9. Crons

## Setup

1. Ensure that `node >= 8.6` is installed
2. Run `npm install`
3. Run `npm test`, you should expect to see the linter passing but all tests failing
4. Run `npm run report` to see the coverage reports
5. Run `npm run test:watch` to have tests automatically rerun when changes are made

## Goals

Our goals in the following exercises are:

1. Understand the power and application of idempotency in:
    1. Pure functions
    2. Databases
    3. Web servers
    4. Message queues
    5. Crons

## Steps

### Functions

Idempotency is easiest to understand in the context of functions. We will see an example of an idempotent function and a non idempotent function. This will give us a baseline understanding to try to understand idempotence in other contexts and levels.

1. Implement `src/function.js` so that all tests in `tests/function.test.js` pass.
2. Run `npm test` to ensure `test/function.test.js` pass and code coverage is at `100%` 

In writing the implementation, you will find that in order to implement the non idempotent version, you will need to rely on state outside of the context of the function. This is crucial. All functions that rely on external state have the potential to be non idempotent.

Ask yourself:

> Which of these functions is easier to work with and debug?

You will typically find that pure functions are easier to debug because it's hard to know the state that the function relies on during runtime.

### Databases

Databases are the next area we should understand idempotency. After functions, it is most important to understand it at this level because it will be the foundation of almost everything that comes afterwards because most of the state of applications is managed by some kind of database.

1. Implement `src/database.js` so that all tests in `tests/database.test.js` pass.
2. Run `npm test` to ensure `test/function.test.js` pass and code coverage is at `100%`

In writing the implementation, you may need some way of knowing what the state in the database is before writing a new cat. You can consider two methods in accomplishing this:

1. Using a query
2. Using an index

In practice, using an index is safer because it is a database level guarantee there will not be any duplicate values with the set of keys you define in the index.

### Web Servers

Web servers also need idempotency for many reasons including:

1. Caching
2. Security
3. Graceful retry

Our steps will be:

1. Implement `src/app.js` so that all tests in `tests/app.test.js` pass.
2. Run `npm test` to ensure `test/app.test.js` pass and code coverage is at `100%`