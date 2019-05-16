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

1. 