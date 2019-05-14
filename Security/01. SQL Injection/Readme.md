# SQL Injection

In this exercise, we will being to address injection attacks, one of the most common class of security vulnerabilities across the internet according to OWASP. SQL injection is a specific form of injection attacks that is characterized by the ability of an attacker to improperly gain access to data that they should not be allowed to.

## Needed Tools

1. Programming Language/Platform
2. Code Editor
3. Linter
4. Test Harness
5. Code Coverage Tool
6. Web Servers

## Setup

1. Ensure that `node >= 8.6` is installed
2. Run `npm install`
3. Run `npm test`, you should expect to see all tests passing and some code coverage
4. Run `npm run report` to see the coverage reports
5. Run `npm run test:watch` to have tests automatically rerun when changes are made

## Exercise

### Goals

Our goals in the following exercise are:

1. Learn about SQL injections and how to exploit it
2. Learn about how to mitigate SQL injections
3. Ensure that the vulnerability is properly addressed by having an automated test

### Steps

In order to achieve these goals, we will follow these steps:

1. To start with, we want to reproduce the vulnerability:
    1. Start the server with `npm start` in your shell and wait until you see that the server is alive
    2. Make a normal request with postman or your browser to:

    	 `http://localhost:1234/cats/1`
    	 
    	 Expect the first cat to be returned as `JSON`
    3. Make a request with postman or your browser to:

        `http://localhost:1234/cats/105' OR '1=1`

        Verify that you're able to get all of the cats in the database.
2. Make a change to `src/app.js` that prevents this unauthorized behavior using a SQL query sanitizer. The library we use `sqlite` already has a way to do this. Ensure the behavior is fixed by making a request
3. Write a test for the endpoint `/cats/:cat_id` using `supertest` to ensure this behavior is fixed

## Conclusion

Congratulations! We've learned about one of the most common security vulnerabilities on the internet and learned how to exploit and fix it ourselves.