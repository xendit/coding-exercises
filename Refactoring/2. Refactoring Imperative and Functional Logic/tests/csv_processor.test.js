'use strict';

const { expect } = require('chai');

const CSVProcessor = require('../src/csv_processor');

describe('csv processor tests', () => {
    it('should return error when paths to files is not an array', (done) => {
        const pathsToFiles = 'foo';
        const pathToOutput = `${__dirname}/output/1+2.csv`;
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
