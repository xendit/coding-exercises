'use strict';

const { expect } = require('chai');

function add (a, b) {
    return a + b;
}

describe('add', () => {
    it('should add', () => {
        try {
            expect(add(1, 2)).to.equal(3);
        } catch (err) {
            // This block is never reached, it should be removed

            expect(err).to.be('null');
        }
    });
});
