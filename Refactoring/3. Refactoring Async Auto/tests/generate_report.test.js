'use strict';

const { expect } = require('chai');
const generateReport = require('../src/generate_report');

describe('generate report tests', () => {
    it('should return an error when path to csv files is not an array', (done) => {
        const pathsToCSVFiles = 'foo';
        const pathsToJSONFiles = [`${__dirname}/fixtures/1.json`];
        const pathToOutputDirectory = __dirname;

        generateReport(pathsToCSVFiles, pathsToJSONFiles, pathToOutputDirectory, (err) => {
            expect(err).to.be.an('error');

            done();
        });
    });
});
