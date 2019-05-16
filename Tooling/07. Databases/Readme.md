# Databases

Databases are important for building applications that can reliably save and reference state. Most applications on the internet needs this capability.

## Needed Tools

1. Programming Language/Platform
2. Code Editor
3. Linter
4. Test Harness
5. Code Coverage Tool
6. Databases

## Setup

1. Ensure that `node >= 8.6` is installed
2. Run `npm install`
3. Run `npm test` and see that linter passes but there are failing tests

## Exercise

### Goals

Our goals in the following exercise are:

1. Get hands on experience with two flavors of databases, SQL and no-SQL. Through this, we should gain a better understanding of why each is preferred.
2. Get hands on experience with basic setup and operations of common databases.

### Steps

#### Installation

We are going to start with installing the databases locally so we can access them:

1. Install sqlite to use as our example of a SQL database:

    `npm install sqlite --save`

2. Ensure redis is installed and running locally:

    Follow this [documentation](https://redis.io/topics/quickstart)

3. Ensure mongodb is installed and running locally:

    Follow this [documentation](https://docs.mongodb.com/manual/installation/) for the community edition

#### Database Setup, Connection, and Execution

1. Modify the code in `src/build_sqlite_connection.js` to ensure that the tests in `tests/build_sqlite_connection.test.js` all pass.
