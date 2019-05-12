'use strict';

const { expect } = require('chai');
const requestStub = require('../src/request_stub');

describe('stubbed tests', () => {
    it('should throw error when urls is not an array', async () => {
        const stubbedRequest = () => '<html><head></head><body><div>Hello<div>World</div></div></body>';
        const urls = '1234';

        try {
            await requestStub(stubbedRequest, urls);
        } catch (err) {
            return expect(err).to.be.an('error');
        }

        throw new Error('expected error');
    });
});
