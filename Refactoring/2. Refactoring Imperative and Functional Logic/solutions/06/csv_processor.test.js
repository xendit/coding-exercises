'use strict';

const { expect } = require('chai');

const CSVProcessor = require('../src/csv_processor');

describe('csv processor tests', () => {
    describe('combineFiles', () => {
        it('should return error when paths to files is not an array', (done) => {
            const pathsToFiles = 'foo';
            const pathToOutput = `${__dirname}/output/1+2.csv`;
            const headers = ['foo', 'bar'];

            CSVProcessor.combineFiles(pathsToFiles, pathToOutput, headers, (err) => {
                expect(err).to.be.an('error');

                done();
            });
        });

        it('should return error when paths to output does not contain csv', (done) => {
            const pathsToFiles = ['foo.csv'];
            const pathToOutput = 'foo.txt';
            const headers = ['foo', 'bar'];

            CSVProcessor.combineFiles(pathsToFiles, pathToOutput, headers, (err) => {
                expect(err).to.be.an('error');

                done();
            });
        });

        it('should return error when headers is not an array', (done) => {
            const pathsToFiles = ['foo.csv'];
            const pathToOutput = 'foo.csv';
            const headers = 'foo';

            CSVProcessor.combineFiles(pathsToFiles, pathToOutput, headers, (err) => {
                expect(err).to.be.an('error');

                done();
            });
        });

        it('should return error when headers contains a non string', (done) => {
            const pathsToFiles = ['foo.csv'];
            const pathToOutput = 'foo.csv';
            const headers = [1, 'foo'];

            CSVProcessor.combineFiles(pathsToFiles, pathToOutput, headers, (err) => {
                expect(err).to.be.an('error');

                done();
            });
        });

        it('should write file when some input file is not a csv', (done) => {
            const pathsToFiles = [`${__dirname}/fixtures/1.csv`, 'foo.txt'];
            const pathToOutput = `${__dirname}/output/1+2.csv`;
            const headers = ['foo', 'bar'];

            CSVProcessor.combineFiles(pathsToFiles, pathToOutput, headers, done);
        });

        it('should return error when some file does not exist', (done) => {
            const pathsToFiles = [`${__dirname}/fixtures/1.csv`, 'not_exists.csv'];
            const pathToOutput = `${__dirname}/output/1+2.csv`;
            const headers = ['foo', 'bar'];

            CSVProcessor.combineFiles(pathsToFiles, pathToOutput, headers, (err) => {
                expect(err).to.be.an('error');

                done();
            });
        });

        it('should write file when some input file is empty', (done) => {
            const pathsToFiles = [`${__dirname}/fixtures/1.csv`, `${__dirname}/fixtures/empty.csv`];
            const pathToOutput = `${__dirname}/output/1+empty.csv`;
            const headers = ['foo', 'bar'];

            CSVProcessor.combineFiles(pathsToFiles, pathToOutput, headers, done);
        });

        it('should write file when some file is missing at least a single header', (done) => {
            const pathsToFiles = [`${__dirname}/fixtures/1.csv`, `${__dirname}/fixtures/missing.csv`];
            const pathToOutput = `${__dirname}/output/1+missing.csv`;
            const headers = ['foo', 'bar'];

            CSVProcessor.combineFiles(pathsToFiles, pathToOutput, headers, done);
        });

        it('should return error when path to output is invalid', (done) => {
            const pathsToFiles = [`${__dirname}/fixtures/1.csv`, `${__dirname}/fixtures/missing.csv`];
            const pathToOutput = '/error.csv';
            const headers = ['foo', 'bar'];

            CSVProcessor.combineFiles(pathsToFiles, pathToOutput, headers, (err) => {
                expect(err).to.be.an('error');

                done();
            });
        });

        it('should write file', (done) => {
            const pathsToFiles = [`${__dirname}/fixtures/1.csv`, `${__dirname}/fixtures/2.csv`];
            const pathToOutput = `${__dirname}/output/1+2.csv`;
            const headers = ['foo', 'bar'];

            CSVProcessor.combineFiles(pathsToFiles, pathToOutput, headers, done);
        });
    });

    describe('control flow', () => {
        it('should return error when paths to files are not an array', async () => {
            const pathsToFiles = 'foo';
            const pathToOutput = `${__dirname}/output/hello.csv`;
            const headers = ['foo', 'bar'];
            const stubbedFS = {};

            try {
                await CSVProcessor.controlFlow(stubbedFS, pathsToFiles, pathToOutput, headers);
            } catch (err) {
                return expect(err).to.be.an('error');
            }

            throw new Error('expected error');
        });

        it('should return error when paths to output does not contain csv', async () => {
            const pathsToFiles = ['foo.csv'];
            const pathToOutput = 'foo.txt';
            const headers = ['foo', 'bar'];
            const stubbedFS = {};

            try {
                await CSVProcessor.controlFlow(stubbedFS, pathsToFiles, pathToOutput, headers);
            } catch (err) {
                return expect(err).to.be.an('error');
            }

            throw new Error('expected error');
        });

        it('should return error when headers is not an array', async () => {
            const pathsToFiles = ['foo.csv'];
            const pathToOutput = 'foo.csv';
            const headers = 'foo';
            const stubbedFS = {};

            try {
                await CSVProcessor.controlFlow(stubbedFS, pathsToFiles, pathToOutput, headers);
            } catch (err) {
                return expect(err).to.be.an('error');
            }

            throw new Error('expected error');
        });

        it('should return error when headers contains a non string', async () => {
            const pathsToFiles = ['foo.csv'];
            const pathToOutput = 'foo.csv';
            const headers = [1, 'foo'];
            const stubbedFS = {};

            try {
                await CSVProcessor.controlFlow(stubbedFS, pathsToFiles, pathToOutput, headers);
            } catch (err) {
                return expect(err).to.be.an('error');
            }

            throw new Error('expected error');
        });

        it('should return error when reading file', async () => {
            const pathsToFiles = ['foo.csv'];
            const pathToOutput = 'foo.csv';
            const headers = ['foo', 'bar'];
            const stubbedFS = {
                readFile: (pathToFile, callback) => callback(new Error('read file error'))
            };

            try {
                await CSVProcessor.controlFlow(stubbedFS, pathsToFiles, pathToOutput, headers);
            } catch (err) {
                return expect(err).to.be.an('error');
            }

            throw new Error('expected error');
        });

        it('should build combined file', async () => {
            const pathsToFiles = ['foo.csv'];
            const pathToOutput = 'foo.csv';
            const headers = ['foo', 'bar'];
            const stubbedFS = {
                readFile: (pathToFile, callback) => callback(null, 'foo,bar,\n1,2'),
                mkdir: (pathToDir, opts, callback) => callback(null),
                writeFile: (pathToOutput, fileData, callback) => callback(null)
            };

            await CSVProcessor.controlFlow(stubbedFS, pathsToFiles, pathToOutput, headers);
        });
    });
});
