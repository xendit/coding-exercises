# Refactoring Functional Logic

Refactoring functional logic is one of the most straightforward refactors that can be performed because of the lack of **external dependencies**.

## Needed Tools

1. Version Control
2. Programming Language/Platform
3. Linter
4. Test Harness
5. Code Coverage Tool

## Setup

1. Ensure that `node >= 8.6` is installed
2. Run `npm install`
3. Run `npm test`, you should expect to see all tests passing and some code coverage
4. Run `npm run report` to see the coverage reports
5. Run `npm run test:watch` to have tests automatically rerun when changes are made

## Exercise

### Goals

Our goals in the following exercise are:

1. Improve readability and maintainability of functional logic
2. Ensure that each change we make is 100% safe (will keep existing behavior to be **THE EXACT SAME**)

### Steps

In order to achieve these goals, we need to go through a few steps:

1. Reach 100% coverage on lines and branches
2. Refactor functional logic
3. Improve readability and naming

#### 1. Achieve Coverage

Our first step is to achieve full coverage of lines and branches. Write the minimum number of tests necessary to achieve this level and then create a commit. Name this commit something along the lines of `[Test] add full coverage of fizz buzz mapper`.

100% line coverage for an **entire function** is important because it allows us to be confident that every line in our program can run and doesn't lead to a runtime error.

100% branch coverage is important within an **entire function** because it allows us to be confident that every case in our logic is explored.

Covering both to 100% means we've fully captured the current behavior of the program. It doesn't mean there are no bugs because we haven't specified the full requirements of this program. Bugs are deviations from the requirements of the software so without knowing more about the requirements, we won't know what is/isn't a bug.

#### 2. Refactor Functional Logic

Now that full test coverage has been achieved, we will want to make changes to improve the readability and maintainability of our functional logic **WITHOUT CHANGING BEHAVIOR**. 

There are some changes we can consider making:

1. Change `for` loop into array higher order function `map`
2. Change callback to use `async/await`

After **each individual refactor**, create a new commit with the prefix `[refactor]`.

#### 3. Refactor Readability and Naming

The last step for this exercise is to refactor to improve variable naming and understanding.

There are a few changes we should consider making:

1. Functions should describe what they return
2. Variable names should be descriptive of what they reference/contain

After **each individual refactor**, create a new commit with the prefix `[refactor]`

### Conclusion

Congratulations! You've finished the first refactoring exercise. In this exericse, we're focusing on functional logic because it is the foundation of all of our future software.
