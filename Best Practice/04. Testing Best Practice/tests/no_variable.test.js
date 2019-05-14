'use strict';

const { expect } = require('chai');

function math (a, b) {
    return {
        add: a + b,
        sub: b - 1
    };
}

function mathWithRand (a, b) {
    return {
        add: a + b,
        sub: b - 1,
        rand: Math.random()
    };
}

describe('test without variables', () => {
    it('should test with values instead of variables', () => {
        const result = math(1, 2);

        // This case will pass even if the result object does not have add, sub
        expect(result).to.deep.equal({ add: result.add, sub: result.sub });
    });

    it('should test with type checking at least if variables are necessary', () => {
        const result = mathWithRand(1, 2);

        // This is missing a type check on rand
        expect(result).to.deep.equal({ add: 3, sub: 1, rand: result.rand });
    });
});
