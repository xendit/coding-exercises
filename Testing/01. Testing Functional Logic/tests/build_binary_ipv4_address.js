'use strict';

const { expect } = require('chai');

const buildPaddedBinaryIPV4Address = require('../src/build_binary_ipv4_address');

describe('build padded binary IPV4 address', () => {
    it('should throw error when ip address is not a string', () => {
        const ipAddress = 5;

        expect(buildPaddedBinaryIPV4Address.bind(null, ipAddress)).to.throw('ip address should be a string');
    });
});
