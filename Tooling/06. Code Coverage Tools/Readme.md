# [WIP] Code Coverage Tools

Code coverage tools are a great complement to our testing harness that we set up previously. They are important to allow us to know the amount of code that is covered by tests and the different kinds of coverage that we have.

In this exercise, we will focus on understanding what coverage means, how to set it up, and how to increase it by changing our tests.

## Needed Tools

1. Version Control
2. Programming Language/Platform
3. Linter
4. Test Harness

## Setup

1. Ensure that `node >= 8.6` is installed
2. Run `npm install`
3. Run `npm test`, you should expect to see all tests passing and some code coverage

## Goals

Our goals in the following exercises are:

1. Gain an understanding of what coverage is and what specific kinds of coverage there are and what they measure.
2. Learn how to set up and configure code coverage tooling and reporting.
3. Learn how to improve code coverage by changing our tests.

## Steps

### Setup

Our steps will be the following:

1. Install `nyc` as your code coverage tool. If you're using `jest`, you will already have access to built in code coverage but for this exercise will explore `nyc` + `mocha`.
	
	`npm install nyc --save-dev`
2. Install `opn-cli` to help us open the coverage file from the command line across different OSes

	`npm install opn-cli --save-dev`
3. Change the script `"test:unit"` in `package.json` to include `nyc`. We do this by calling it before mocha like:
	
	`"./node_modules/.bin/nyc ./node_module/.bin/mocha tests"`
4. Run `npm run test:unit` and look for the coverage report being printed in your shell. You should see that we already have 100% coverage.
5. Add a way for us to display HTML reports of our coverage for deeper analysis by adding a new script with key `"report"` and value
	
	`"./node_modules/.bin/nyc report --reporter=html && ./node_modules/.bin/opn coverage/index.html"`
6. Open the HTML report with `npm run report`
7. Each time we run our tests, we can simply refresh the HTML page and get an updated view of our coverage

### Configuration

By default, `nyc` will only cover the required files in your tests. If you want to cover specific files or all files, we will need to make specific modifications to our setup.

1. Include all files, even if they're never required in our tests. We may find files that we didn't write tests for! Update your `"test:unit"` script to include the `--all` flag. The command will look like:
	
	`"./node_modules/.bin/nyc --all ./node_modules/.bin/mocha tests"`
2. Run `npm test:unit` to see that now we missed `src/date_util.js` and `src/bower_components/jquery.js` and our overall coverage level has dropped.
3. We can also put config into a JSON file named `.nycrc.json`. Try creating a file with the following JSON data:
	
	```
	{
		"all": true
	}
	```
	
	and remove the `--all` flag in your `package.json`
4. Run `npm run test:unit` to see the same level of coverage as when we used the `--all` flag
5. We don't want to include files in `bower_components` in our code coverage count so we're going to modify our coverage config file to exlcude that entire folder:

	```
	{
		"all": true,
		"exclude": ["**/bower_components/**/*.js"]
	}
	```
6. We can see in our coverage that we're including test files. If we want to strictly define what to include like below:

	```
	{
		"all": true,
		"include": ["src/**/*.js"],
		"exclude": ["**/bower_components/**/*.js"]
	}
	```

	You should only see the files `src/math_util.js` and `src/date_util.js` being covered.