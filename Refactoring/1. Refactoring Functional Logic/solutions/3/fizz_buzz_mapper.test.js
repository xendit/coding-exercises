'use strict';

const { expect } = require('chai');

const fizzBuzzMapper = require('../src/fizz_buzz_mapper');

describe('Fizz Buzz Mapper', () => {
    it('should give error when start index is not a number', async () => {
        try {
            await fizzBuzzMapper('foo', 4);
        } catch (err) {
            expect(err).to.be.an('error');
        }
    });

    it('should give error when starting index is greater than ending index', async () => {
        try {
            await fizzBuzzMapper(5, 4);
        } catch (err) {
            expect(err).to.be.an('error');
        }
    });

    it('should map 1 to 4', async () => {
        const result = await fizzBuzzMapper(1, 4);

        expect(result).to.deep.equal([1, 2, 'Fizz']);
    });

    it('should map negative numbers', async () => {
        const result = await fizzBuzzMapper(-3, 4);

        expect(result).to.deep.equal(['Fizz', -2, -1, 0, 1, 2, 'Fizz']);
    });

    it('should map multiples of 5', async () => {
        const result = await fizzBuzzMapper(1, 11);

        expect(result).to.deep.equal([1, 2, 'Fizz', 4, 'Buzz', 'Fizz', 7, 8, 'Fizz', 'Buzz']);
    });
});
