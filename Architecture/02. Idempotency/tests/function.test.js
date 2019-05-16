'use strict';

const { expect } = require('chai');
const FN = require('../src/function');

describe('testing idempotency at the function level', () => {
    describe('idempotent', () => {
        it('should be idempotent', () => {
            const result = FN.idempotentFn(1, 2);
            const secondResult = FN.idempotentFn(2, 2);
            const thirdResult = FN.idempotentFn(1, 2);
            const fourthResult = FN.idempotentFn(2, 2);

            expect(result).to.equal(3);
            expect(secondResult).to.equal(4);
            expect(thirdResult).to.equal(3);
            expect(fourthResult).to.equal(4);
        });
    });

    describe('non idempotent', () => {
        it('should not be idempotent', () => {
            const result = FN.nonidempotentFn(1, 2);
            const secondResult = FN.nonidempotentFn(2, 2);
            const thirdResult = FN.nonidempotentFn(1, 2);
            const fourthResult = FN.nonidempotentFn(2, 2);

            expect(result).to.equal(3);
            expect(secondResult).to.equal(4);
            expect(thirdResult).to.equal(5);
            expect(fourthResult).to.equal(6);
        });
    });
});
