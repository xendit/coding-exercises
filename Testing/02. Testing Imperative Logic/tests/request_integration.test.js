'use strict';

const { expect } = require('chai');
const requestIntegration = require('../src/request_integration');

describe('full integration tests', () => {
    it('should throw error when urls is not an array', async () => {
        const urls = '1234';

        try {
            await requestIntegration(urls);
        } catch (err) {
            return expect(err).to.be.an('error');
        }

        throw new Error('expected error');
    });
});
