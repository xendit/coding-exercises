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

    Test your connection with `redis-cli` in your shell. It should open a connection to your local redis server.

    Install the redis node client using `npm install redis --save`

3. Ensure mongodb is installed and running locally:

    Follow this [documentation](https://docs.mongodb.com/manual/installation/) for the community edition

    Test your connection by using a mongo client like [Robo 3T](https://robomongo.org/) to connect to your local mongo at `localhost:27017`.

    Install the mongo node client using `npm install mongodb --save`

#### Database Setup, Connection, and Execution

1. Modify the code in `src/build_sqlite_connection.js` to ensure that the tests in `tests/build_sqlite_connection.test.js` all pass.

    You'll notice for the second test, there will be a new file in the root directory named `database.sqlite`. This file will contain your data so if you open a connection to this file, the data you saved will be recorded here.

2. Modify the code in `src/build_redis_connection.js` to ensure that the tests in `tests/build_redis_connection.test.js` all pass. Ensure you have redis running locally before you run the test.

3. Modify the code in `src/build_mongo_connection.js` to ensure that the tests in `tests/build_mongo_connection.test.js` all pass. Ensure you have mongo running locally before you run the test.

#### Use Case: Joins

Joins are a very common use case in which we must combine data from multiple collections/tables into a single result. Let's see how this works in practice between SQL and no-SQL.

##### Joining

We are going to work with 3 tables in this example: `Owners`, `OwnerCats`, and `Cats`. For the purposes of this exercise, there is a many-to-many relationship between owners and cats.

```
-------------------             --------------           --------------
| Cats            |             | OwnerCats  |           | Owners     |
-------------------             --------------           --------------
| CatID Text PK   | +-------    | Id PK      |     |----+| OwnerId PK |
| Name Text       |        |---<| CatId FK   |     |     | Name Text  |
| Color Text      |             | OwnerId FK | >---|     --------------
| Age Integer     |             --------------
-------------------
```

1. Modify the code in `src/join_sql.js` to ensure that the tests in `tests/join_sql.test.js` all pass.
2. Modify the code in `src/join_nosql.js` to ensure that the tests in `tests/join_nosql.test.js` all pass.

##### [WIP] Transactions

Transactions are important for us to maintain the consistency of the data in the database when there are multiple steps that need to be made at the same time.

##### [WIP] Performance

##### [WIP] Flexibility