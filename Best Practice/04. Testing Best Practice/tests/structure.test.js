'use strict';

const { expect } = require('chai');

class MathUtil {
    static add (a, b) {
        return a + b;
    }

    static sub (b, a) {
        return b - a;
    }

    static mult (a, b) {
        return a * b;
    }

    static div (a, b) {
        return a / b;
    }
}

describe('testing math util', () => {
    it('should add 2 numbers', () => {
        expect(MathUtil.add(1, 2)).to.equal(3);
    });

    describe('sub', () => {
        it('should subtract 2 numbers and the first argument is the number to be subtracted from', () => {
            expect(MathUtil.sub(2, 1)).to.equal(1);
        });
    });
});
