'use strict';

const { expect } = require('chai');

const CSVProcessor = require('../src/csv_processor');

describe('csv processor tests', () => {
    describe('combineFiles', () => {
        it('should return error when paths to files is not an array', async () => {
            const pathsToFiles = 'foo';
            const pathToOutput = `${__dirname}/output/1+2.csv`;
            const headers = ['foo', 'bar'];

            try {
                await CSVProcessor.combineFiles(pathsToFiles, pathToOutput, headers);
            } catch (err) {
                return expect(err).to.be.an('error');
            }

            throw new Error('expected error');
        });

        it('should return error when paths to output does not contain csv', async () => {
            const pathsToFiles = ['foo.csv'];
            const pathToOutput = 'foo.txt';
            const headers = ['foo', 'bar'];

            try {
                await CSVProcessor.combineFiles(pathsToFiles, pathToOutput, headers);
            } catch (err) {
                return expect(err).to.be.an('error');
            }

            throw new Error('expected error');
        });

        it('should return error when headers is not an array', async () => {
            const pathsToFiles = ['foo.csv'];
            const pathToOutput = 'foo.csv';
            const headers = 'foo';

            try {
                await CSVProcessor.combineFiles(pathsToFiles, pathToOutput, headers);
            } catch (err) {
                return expect(err).to.be.an('error');
            }

            throw new Error('expected error');
        });

        it('should return error when headers contains a non string', async () => {
            const pathsToFiles = ['foo.csv'];
            const pathToOutput = 'foo.csv';
            const headers = [1, 'foo'];

            try {
                await CSVProcessor.combineFiles(pathsToFiles, pathToOutput, headers);
            } catch (err) {
                return expect(err).to.be.an('error');
            }

            throw new Error('expected error');
        });

        it('should write file when some input file is not a csv', async () => {
            const pathsToFiles = [`${__dirname}/fixtures/1.csv`, 'foo.txt'];
            const pathToOutput = `${__dirname}/output/1+2.csv`;
            const headers = ['foo', 'bar'];

            await CSVProcessor.combineFiles(pathsToFiles, pathToOutput, headers);
        });

        it('should return error when some file does not exist', async () => {
            const pathsToFiles = [`${__dirname}/fixtures/1.csv`, 'not_exists.csv'];
            const pathToOutput = `${__dirname}/output/1+2.csv`;
            const headers = ['foo', 'bar'];

            try {
                await CSVProcessor.combineFiles(pathsToFiles, pathToOutput, headers);
            } catch (err) {
                return expect(err).to.be.an('error');
            }

            throw new Error('expected error');
        });

        it('should write file when some input file is empty', async () => {
            const pathsToFiles = [`${__dirname}/fixtures/1.csv`, `${__dirname}/fixtures/empty.csv`];
            const pathToOutput = `${__dirname}/output/1+empty.csv`;
            const headers = ['foo', 'bar'];

            await CSVProcessor.combineFiles(pathsToFiles, pathToOutput, headers);
        });

        it('should write file when some file is missing at least a single header', async () => {
            const pathsToFiles = [`${__dirname}/fixtures/1.csv`, `${__dirname}/fixtures/missing.csv`];
            const pathToOutput = `${__dirname}/output/1+missing.csv`;
            const headers = ['foo', 'bar'];

            await CSVProcessor.combineFiles(pathsToFiles, pathToOutput, headers);
        });

        it('should return error when path to output is invalid', async () => {
            const pathsToFiles = [`${__dirname}/fixtures/1.csv`, `${__dirname}/fixtures/missing.csv`];
            const pathToOutput = '/error.csv';
            const headers = ['foo', 'bar'];

            try {
                await CSVProcessor.combineFiles(pathsToFiles, pathToOutput, headers);
            } catch (err) {
                return expect(err).to.be.an('error');
            }

            throw new Error('expected error');
        });

        it('should write file', async () => {
            const pathsToFiles = [`${__dirname}/fixtures/1.csv`, `${__dirname}/fixtures/2.csv`];
            const pathToOutput = `${__dirname}/output/1+2.csv`;
            const headers = ['foo', 'bar'];

            await CSVProcessor.combineFiles(pathsToFiles, pathToOutput, headers);
        });
    });

    describe('readFiles', () => {
        it('should return files', async () => {
            const stubbedFS = {
                readFile: (pathToFile, callback) => callback(null, 'foo, bar,\n1,2,')
            };
            const pathsToFiles = ['foo.csv'];

            const result = await CSVProcessor.readFiles(stubbedFS, pathsToFiles);

            expect(result).to.deep.equal([
                'foo, bar,\n1,2,'
            ]);
        });

        it('should skip non csv files', async () => {
            const stubbedFS = {
                readFile: (pathToFile, callback) => callback(null, 'foo, bar,\n1,2,')
            };
            const pathsToFiles = ['foo.csv', 'bar.txt'];

            const result = await CSVProcessor.readFiles(stubbedFS, pathsToFiles);

            expect(result).to.deep.equal([
                'foo, bar,\n1,2,'
            ]);
        });

        it('should return read file error', async () => {
            const stubbedFS = {
                readFile: (pathToFile, callback) => callback(new Error('error reading file'))
            };
            const pathsToFiles = ['foo.csv'];

            try {
                await CSVProcessor.readFiles(stubbedFS, pathsToFiles);
            } catch (err) {
                return expect(err).to.be.an('error');
            }

            throw new Error('expected error');
        });
    });

    describe('writeOutput', () => {
        it('should write file', async () => {
            const stubbedFS = {
                mkdir: (pathToOutput, opts, callback) => callback(null),
                writeFile: (pathToOutput, fileData, callback) => callback(null)
            };
            const pathToOutput = 'foo.csv';
            const result = ['1234'];

            await CSVProcessor.writeOutput(stubbedFS, pathToOutput, result);
        });

        it('should return error other than EEXIST', async () => {
            const stubbedFS = {
                mkdir: (pathToOutput, opts, callback) => callback(new Error('could not mkdir')),
                writeFile: (pathToOutput, fileData, callback) => callback(null)
            };
            const pathToOutput = 'foo.csv';
            const result = '1234';

            try {
                await CSVProcessor.writeOutput(stubbedFS, pathToOutput, result);
            } catch (err) {
                return expect(err).to.be.an('error');
            }

            throw new Error('expected error');
        });
    });
});
