'use strict';

const { expect } = require('chai');

function addVanilla (a, b) {
    if (typeof a !== 'number') {
        throw new Error('a must be a number');
    }

    return a + b;
}

function addCb (a, b, cb) {
    if (typeof a !== 'number') {
        return cb(new Error('a must be a number'));
    }

    cb(null, a + b);
}

async function addAsync (a, b) {
    if (typeof a !== 'number') {
        throw new Error('a must be a number');
    }

    return a + b;
}

describe('testing different function styles', () => {
    describe('testing vanilla functions', () => {
        it('should add', () => {
            expect(addVanilla(1, 2)).to.equal(3);
        });
    });

    describe('testing callback functions', () => {
        it('should add', (done) => {
            addCb(1, 2, (err, result) => {
                if (err) {
                    return done(err);
                }

                expect(result).to.equal(3);

                done();
            });
        });
    });

    describe('testing async functions', () => {
        it('should add', async () => {
            const result = await addAsync(1, 2);

            expect(result).to.equal(3);
        });
    });
});
