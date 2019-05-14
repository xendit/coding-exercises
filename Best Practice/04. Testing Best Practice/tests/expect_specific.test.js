'use strict';

const { expect } = require('chai');

function add (a, b) {
    return a + b;
}

function math (a, b) {
    return {
        add: a + b,
        sub: b - a,
        mult: a * b,
        div: a / b,
        mod: a % b
    };
}

describe('testing for specific values', () => {
    it('should test add for the exact value', () => {
        const result = add(1, 2);

        // We are only checking for data type here, where we should be testing for the exact value.
        // If the add function changes to multiply, this expect won't be able to catch it
        expect(result).to.be.a('number');
    });

    it('should test math for the exact values', () => {
        const result = math(2, 1);

        // We should use expect(result).to.deep.equal() to expect the exact object with the correct keys and values
        expect(result).to.be.an('object');
    });
});
