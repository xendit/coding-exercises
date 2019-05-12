# Linters

Code linters are important, especially in a non strongly typed environment. However, they can be understood separately from type systems and work mainly to increase the readability through standardization of code formatting.

Linters are an invaluable tool for engineers to leverage correctly because it allows us to catch many basic errors before have to run our application code, saving us precious time and energy in our development process.

In the exercise below, we will explore a powerful linting library called `eslint` and learn how to set it up in our project.

## Needed Tools

1. Version Control
2. Programming Language/Platform

## Setup

1. Ensure that `node >= 8.6.0` is installed
2. Run `npm install`

## Steps

We will follow these set of steps to set up our linter properly:

1. Go to the `eslint` docs found [here](https://www.npmjs.com/package/eslint).
2. Install eslint according to the instructions, ensure you're using `--save-dev` in order to ensure that the dependency is installed locally.
3. Run `./node_modules/.bin/eslint --init` to set up the linter in this directory and follow the instructions and prompts.