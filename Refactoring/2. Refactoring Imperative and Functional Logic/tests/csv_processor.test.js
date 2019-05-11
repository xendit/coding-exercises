'use strict';

const CSVProcessor = require('../src/csv_processor');

describe('csv processor tests', () => {
    it('should write file', (done) => {
        const pathsToFiles = [`${__dirname}/fixtures/1.csv`, `${__dirname}/fixtures/2.csv`];

        CSVProcessor.combineFiles(pathsToFiles, `${__dirname}/output/1+2.csv`, ['foo', 'bar'], done);
    });
});
