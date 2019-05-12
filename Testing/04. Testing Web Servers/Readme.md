# Testing Web Servers

Web servers are a very useful of exposing and organizing information. HTTP is a robust application protocol that allows for a diverse range of use cases that can support the majority of the current internet.

We are going to learn how to test our web servers independently first so we can familiarize ourselves with the tooling and practices to be successful in the future.

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
6. Run `npm run start` to spin up the application server on your local machine. You can hit it via `curl` or use Postman as well.

## Exercise

### Goals

Our goals in the following exericse are:

1. Learn how to reach 100% coverage on lines and branches for web servers
2. Get hands on practice with a modern testing harness, tools, and techniques

### Steps

In order to achieve these goals, we will follow these steps:

1. Aim for 100% line and branch coverage of the logic in `src/app.js` by adding tests to `tests/app.js` using `supertest`.

### Conclusion

Congratulations! You've just finished the testing exercise focused on introducing testing for web servers. Given how critical they are as one of the fundamental building blocks of the internet, we'll do well to make sure we know how to test them for correctness. In the future, we will look at more complicated examples when web servers are combined with databases which is a very common use case and commonly known as a microservice.