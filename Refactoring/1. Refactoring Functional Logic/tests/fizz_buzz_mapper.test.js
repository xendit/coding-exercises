'use strict';

const { expect } = require('chai');

const fizzBuzzMapper = require('../src/fizz_buzz_mapper');

describe('Fizz Buzz Mapper', () => {
    it('should give error when start index is not a number', (done) => {
        fizzBuzzMapper('foo', 4, (err) => {
            expect(err).to.be.an('error');

            done();
        });
    });

    it('should map 1 to 4', (done) => {
        fizzBuzzMapper(1, 4, (err, result) => {
            if (err) {
                return done(err);
            }

            expect(result).to.deep.equal([1, 2, 'Fizz']);

            done();
        });
    });

    it('should map negative numbers', (done) => {
        fizzBuzzMapper(-3, 4, function (err, result) {
            if (err) {
                return done(err);
            }

            expect(result).to.deep.equal(['Fizz', -2, -1, 0, 1, 2, 'Fizz']);

            done();
        });
    });
});
