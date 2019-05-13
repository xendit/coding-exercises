'use strict';

const { expect } = require('chai');
const MathUtil = require('../src/math_util');

describe('math util tests', () => {
    it('should add', () => {
        const result = MathUtil.add(1, 2);

        expect(result).to.equal(3);
    });

    it('should subtract', () => {
        const result = MathUtil.subtract(2, 1);

        expect(result).to.equal(1);
    });
});
