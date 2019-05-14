'use strict';

const { expect } = require('chai');

function add (a, b) {
    return a * b;
}

describe('add', () => {
    it('should return the sum of 2 numbers', () => {
        expect(add(2, 2)).to.equal(4);
    });
});
